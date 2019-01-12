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
from server.SimpleWebSocketServer import WebSocket
from server.SimpleWebSocketServer import SimpleWebSocketServer
import re

class BlocklyGpioHandler(WebSocket):
    """ Description. """

    def handleMessage(self):
        """ Description. """
        print(self.data)
        parsed_json = json.loads(self.data)
        if parsed_json['content'] == 'python_code':
            run_python_code(parsed_json['code'], self)
        #self.sendMessage(self.data)

    def handleConnected(self):
        """ Description. """
        print self.address, 'connected'

    def handleClose(self):
        """ Description. """
        print self.address, 'closed'


def run_server():
    """ Description. """
    server = SimpleWebSocketServer('', 8000, BlocklyGpioHandler)
    server.serveforever()


def run_python_code(code, ws):
    """ Description. """
    file_location = create_python_file(code)
    run_python_file(file_location, ws)


def create_python_file(code):
    """ Description. """
    file_path = os.path.join(os.getcwd(), 'gpio.py')
    try:
        python_file = codecs.open(file_path, 'wb+', encoding='utf-8')
        try:
            extended_code = 'import sys\n'
            extended_code += re.sub(r'(.*)(print\(.*\))(\n)', r'\1\2\3\1sys.stdout.flush()\n\3', code)
            python_file.write(extended_code)
        finally:
            python_file.close()
    except Exception as e:
        print(e)
        print('Python file could not be created !!!')
        return None

    return file_path


def run_python_file(location, ws):
    """ Description. """
    cli_command = ['python', location]
    print('CLI command: %s' % ' '.join(cli_command))
    current_process = subprocess.Popen(cli_command,
            bufsize=1,
            shell=False, 
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)
    ws.sendMessage(json.dumps({ 'stdout_line' : 'Program started...' }) + '\n')
    for line in iter(current_process.stdout.readline, ''):
        ws.sendMessage(json.dumps({ 'stdout_line' : line.rstrip() }) + '\n')

