# -*- coding: utf-8 -*-
#
# Description.
#
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
from __future__ import unicode_literals, absolute_import
import sys
import os
import json
import codecs
import websockets
import asyncio
import re
from subprocess import PIPE, Popen, STDOUT
from threading  import Thread
from queue import Queue, Empty
from datetime import datetime
from time import sleep

ON_POSIX = 'posix' in sys.builtin_module_names

async def request_handler(websocket, path):
    while True:
        data = await websocket.recv()
        parsed_json = json.loads(data)
        if parsed_json['content'] == 'python_code':
            await run_python_code(parsed_json['code'], websocket)


def run_server():
    """ Description. """
    start_server = websockets.serve(request_handler, port=8000)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


async def run_python_code(code, ws):
    """ Description. """
    file_location = create_python_file(code)
    await run_python_file(file_location, ws)


def create_python_file(code):
    """ Description. """
    file_path = os.path.join(os.getcwd(), 'gpio.py')
    try:
        python_file = codecs.open(file_path, 'wb+', encoding='utf-8')
        try:
            print('Adding flush statements after print calls...')
            extended_code = 'import sys\n'
            extended_code += re.sub(r'(.*)(print\(.*\))(\n)', r'\1\2\3\1sys.stdout.flush()\n\3', code)
            python_file.write(extended_code)
            print('Added flush lines.')
        finally:
            python_file.close()
    except Exception as e:
        print(e)
        print('Python file could not be created !!!')
        return None

    return file_path


def enqueue_output(out, queue):
    for line in iter(out.readline, b''):
        queue.put(line)
    out.close()


async def run_python_file(location, websocket):
    """ Description. """
    cli_command = ['python', location]
    print('CLI command: %s' % ' '.join(cli_command))
    try:
        start_time = datetime.now()
        current_process = Popen(cli_command,
                bufsize=1,
                shell=False, 
                stdout=PIPE,
                stderr=STDOUT,
                close_fds=ON_POSIX)
        queue = Queue()
        stdout_thread = Thread(target=enqueue_output, args=(current_process.stdout, queue))
        stdout_thread.daemon = True # thread dies with the program
        stdout_thread.start()
        print('Sub process started  @ ' + str(start_time))
        await websocket.send(json.dumps({ 'stdout_line' : 'Program started...' }) + '\n')
        while current_process.poll() == None:
            try:
                line = queue.get_nowait() # or queue.get(timeout=.1)
                await websocket.send(json.dumps({ 'stdout_line' : str(line.rstrip()) }) + '\n')
            except Empty:
                # ok, no line at the moment
                pass
            running_time = datetime.now() - start_time
            if running_time.total_seconds() > 300: # 5 min
                print('Sub process running too long: ' + str(running_time))
                await websocket.send(json.dumps({ 'stdout_line' : 'ERR: Process is running too long' }) + '\n')
                current_process.kill()
            sleep(0.02) # sleep for 20ms (means ui update interval ~50Hz)
    except Exception as e:
        print(e)
        await websocket.send(json.dumps({ 'stdout_line' : 'ERR - Exception occurred: ' + str(e) }) + '\n')
    finally:
        await websocket.send(json.dumps({ 'state_change' : 'finished' }) + '\n')
        print('Execution done')

