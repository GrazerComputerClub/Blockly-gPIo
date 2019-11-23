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
        try:
            data = await asyncio.wait_for(websocket.recv(), timeout=0.02)
            parsed_json = json.loads(data)
            if parsed_json['content'] == 'python_code':
                await run_python_code(parsed_json['code'], parsed_json['lang'], websocket)
        except asyncio.TimeoutError:
            pass # nothing in recv queue


def run_server():
    """ Description. """
    start_server = websockets.serve(request_handler, port=8000)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


async def run_python_code(code, langCode, ws):
    """ Description. """
    file_location = create_python_file(code)
    await run_python_file(file_location, langCode, ws)


def create_python_file(code):
    """ Description. """
    file_path = os.path.join(os.getcwd(), 'gpio.py')
    try:
        python_file = codecs.open(file_path, 'wb+', encoding='utf-8')
        try:
            print('Adding flush statements after print calls...')
            extended_code = 'import sys\nimport time\n'
            extended_code += re.sub(r'(.*)(print\(.*\))(\n)', r'\1\2\3\1sys.stdout.flush()\n\3', code)
            extended_code += '\ntime.sleep(0.1)\n'
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


async def run_python_file(location, langCode, websocket):
    """ Description. """
    cli_command = ['/usr/bin/python3', location]
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
        startMsg = 'Program started...';
        if langCode == 'de':
            startMsg = 'Programm gestartet...'
        await websocket.send(json.dumps({ 'stdout_line' : startMsg }) + '\n')
        while current_process.poll() == None:
            try:
                line = queue.get_nowait() # or queue.get(timeout=.1)
                await websocket.send(json.dumps({ 'stdout_line' : line.rstrip().decode('UTF-8') }) + '\n')
            except Empty:
                # ok, no line at the moment
                pass
            running_time = datetime.now() - start_time
            if running_time.total_seconds() > 300: # 5 min
                print('Sub process running too long: ' + str(running_time))
                await websocket.send(json.dumps({ 'stdout_line' : 'ERR: Process is running too long' }) + '\n')
                current_process.kill()
            try:
                data = await asyncio.wait_for(websocket.recv(), timeout=0.02) # timeout means ui update interval of ~50Hz
                parsed_json = json.loads(data)
                if parsed_json['content'] == 'request' and parsed_json['request_code'] == 'stop':
                    print('Execution stop requested')
                    await websocket.send(json.dumps({ 'stdout_line' : 'NOTIFY: Stop-request processed' }) + '\n')
                    current_process.kill()
                else:
                    print('Wrong data package received')
                    await websocket.send(json.dumps({ 'stdout_line' : 'ERR: Wrong data received - process killed' }) + '\n')
                    current_process.kill()
            except asyncio.TimeoutError:
                pass # nothing in recv queue
            except Exception:
                pass # maybe a json parsing exception
    except Exception as e:
        print(e)
        await websocket.send(json.dumps({ 'stdout_line' : 'ERR - Exception occurred: ' + str(e) }) + '\n')
    finally:
        await websocket.send(json.dumps({ 'state_change' : 'finished' }) + '\n')
        print('Execution done')

