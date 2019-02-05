# Blockly-gPIo
Visual programming for the Raspberry Pi with access to the GPIO and a simple browser-based simulation mode.

Currently this is a beta version, which we're already using in our Raspjamming events.

Inspired from [Scratch](https://scratch.mit.edu/) and [PocketCode](https://www.catrobat.org/intro/) we wanted 
to create an easy system for our Raspjamming events. Thankfully, we didn't need to start from the beginning because 
we found [blockly-gpio](https://github.com/carlosperate/Blockly-gPIo) from carlosperate on Github. Therefore, we 
just improved his proof of concept to a slightly better working solution for our Jam. ;)</p>

## How to use
1st: Make sure that the RPi has the following packages installed:
  * python3 (apt-get install python3-dev python3-gpiozero python3-pip python3-websocket)
  * websockets lib (pip3 install websockets) 
  * gpiozero lib

2nd: Download this repository and execute *run.py* (call 'python3 run.py')

3rd: Just open [blockly-gpio](https://grazercomputerclub.github.io/Blockly-gPIo/) and start to code.

Future tasks:
* Save and load function on Chrome and Firefox, Safari (Android, IPad) [https://github.com/eligrey/FileSaver.js]
* wss support (https)
* Port scanner to find available servers
