/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Description.
 */
'use strict';

var Bgpio = Bgpio || {};
Bgpio.WebSocket = {};

Bgpio.WebSocket.ws = null;
Bgpio.WebSocket.URL = 'ws://localhost:8000/';

Bgpio.WebSocket.connect = function(ip) {
  if (ip) {
    Bgpio.WebSocket.ws = new WebSocket('ws://' + ip + ':8000/');
  } else {
    Bgpio.WebSocket.ws = new WebSocket(Bgpio.WebSocket.URL);
  }
  Bgpio.WebSocket.ws.onopen = function(evt) { Bgpio.WebSocket.open(evt) };
  Bgpio.WebSocket.ws.onclose = function(evt) { Bgpio.WebSocket.close(evt) };
  Bgpio.WebSocket.ws.onmessage = function(evt) { Bgpio.WebSocket.receive(evt) };
  Bgpio.WebSocket.ws.onerror = function(evt) { Bgpio.WebSocket.error(evt) };
};

Bgpio.WebSocket.open = function(evt) {
  if (Bgpio.DEBUG) console.log("connected\n");
  Bgpio.appendTextJsConsole(IsGerman() ? "Verbunden...\n" : "Connected...\n");
};

Bgpio.WebSocket.close = function(evt) {
  if (Bgpio.DEBUG) console.log("disconnected\n");
  Bgpio.appendTextJsConsole(IsGerman() ? "Getrennt!\n" : "Disconnected!\n");
  var runButton = document.getElementById('runButton');
  runButton.setAttribute("onclick", "Bgpio.runMode.run()")
};

Bgpio.WebSocket.disconnect = function() {
  if (Bgpio.DEBUG) console.log('closing\n');
  Bgpio.WebSocket.ws.close();
};

Bgpio.WebSocket.send = function(message) {
  console.log("sending: " + message + '\n');
  Bgpio.WebSocket.ws.send(message);
};

Bgpio.WebSocket.receive = function(evt) {
  if (Bgpio.DEBUG) console.log("received: " + evt.data + '\n');
  var recvData  = JSON.parse(evt.data);
  if (recvData.stdout_line)
    Bgpio.appendTextJsConsole(recvData.stdout_line);
  else if (recvData.state_change) {
    var runButton = document.getElementById('runButton');
    runButton.setAttribute("onclick", "Bgpio.runMode.run()")
    Bgpio.appendTextJsConsole(IsGerman() ? '### Erledigt ###' : '### Done ###');
  }
};

Bgpio.WebSocket.error = function(evt) {
  if (Bgpio.DEBUG) console.log('error: ' + evt.data + '\n');
  Bgpio.WebSocket.ws.close();
};

Bgpio.WebSocket.sendCode = function(codeStr) {
  var payload = JSON.stringify({
    'content': 'python_code', 
    'code': codeStr,
    'lang': document.documentElement.lang
  })
  if (Bgpio.DEBUG) console.log('payload: ' + payload + '\n');
  Bgpio.WebSocket.ws.onopen = () => Bgpio.WebSocket.send(payload);
};

Bgpio.WebSocket.sendStop = function() {
  var payload = JSON.stringify({
    'content': 'request', 
    'request_code': 'stop',
    'lang': document.documentElement.lang
  })
  if (Bgpio.DEBUG) console.log('payload: ' + payload + '\n');
  // here the socket must be open
  Bgpio.WebSocket.send(payload);
};
