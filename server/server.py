# -*- coding: utf-8 -*-
#
# Description.
#
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
from __future__ import unicode_literals, absolute_import
import os
import json
import codecs
import subprocess
import websockets
import asyncio
import re


async def request_handler(websocket, path):
    while True:
        data = await websocket.recv()
        parsed_json = json.loads(data)
        if parsed_json['content'] == 'python_code':
            await run_python_code(parsed_json['code'], websocket)


def run_server():
    """ Description. """
    start_server = websockets.serve(request_handler, '127.0.0.1', 8000)
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


async def run_python_file(location, websocket):
    """ Description. """
    cli_command = ['python', location]
    print('CLI command: %s' % ' '.join(cli_command))
    try:
        current_process = subprocess.Popen(cli_command,
                bufsize=1,
                shell=False, 
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT)
        print('Sub process started')
        await websocket.send(json.dumps({ 'stdout_line' : 'Program started...' }) + '\n')
        for line in current_process.stdout:
            await websocket.send(json.dumps({ 'stdout_line' : str(line.rstrip()) }) + '\n')
    except Exception as e:
        print(e)
    finally:
        await websocket.send(json.dumps({ 'state_change' : 'finished' }) + '\n')
        print('Execution done')

