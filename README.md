# Blockly-gPIo
Visual programming for the Raspberry Pi with access to the GPIO and a simple browser-based simulation mode.

Currently this is a beta version, which we're already using in our Raspjamming events.

Inspired from [Scratch](https://scratch.mit.edu/) and [PocketCode](https://www.catrobat.org/intro/) we wanted 
to create an easy system for our Raspjamming events. Thankfully, we didn't need to start from the beginning because 
we found [blockly-gpio](https://github.com/carlosperate/Blockly-gPIo) from carlosperate on Github. Therefore, we 
just improved his proof of concept to a slightly better working solution for our Jam. ;)</p>

## How to use
1st: Make sure that the RPi has the following packages installed:
* python3
  * websockets lib
  * gpiozero lib

2nd: Download this repository and execute *run.py*

3rd: Just open [blockly-gpio](https://grazercomputerclub.github.io/Blockly-gPIo/) and start to code.

## Open Points
Client (Blockly) side points:
* Import/Export of Blockly code
* Support of dedicated hardware
  * DHT
  * DS18S20
  * Distance sensor
  * 7-segment display
* Better print-statement (to print formated outputs)

Server side:
* Possibility to stop the execution (from the client)
