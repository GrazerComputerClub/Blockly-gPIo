# Blockly-gPIo
Visual programming for the Raspberry Pi with access to the GPIO and a simple browser-based simulation mode.

Currently this is a beta version, which we're already using in our Raspjamming events.

Inspired from [Scratch](https://scratch.mit.edu/) and [PocketCode](https://www.catrobat.org/intro/) we wanted 
to create an easy system for our Raspjamming events. Thankfully, we didn't need to start from the beginning because 
we found [blockly-gpio](https://github.com/carlosperate/Blockly-gPIo) from carlosperate on Github. Therefore, we 
just improved his proof of concept to a slightly better working solution for our Jam. ;)</p>

![Blockly-gPIo screenshot](https://github.com/GrazerComputerClub/Blockly-gPIo/raw/master/blockly_gPIo_screenshot.png)

## Dependencies
 * python3
 * python3 librarys (websockets, gpiozero)
 * webserver, if run locally
 
## Installation
* Make sure that Raspbian 10 (Buster) has the all dependencies installed:  
```
  sudo apt-get install python3-dev python3-gpiozero python3-pip python3-websocket  
  sudo pip3 install websockets -t /usr/local/lib/python3.7/dist-packages
 ```
*  Download this repository and execute *run.py*:  
  ```
  git clone https://github.com/GrazerComputerClub/Blockly-gPIo.git  
  cd Blockly-gPIo  
  python3 run.py
  ``` 
*  Optional: Install local webserver with blockly-gpio   
  ```
  apt-get install lighttpd
  git clone https://github.com/GrazerComputerClub/Blockly-gPIo.git
  install -v -o www-data -g www-data -m 775 -d "/var/www/html/Blockly-gPIo/"
  cp -r Blockly-gPIo/public/* "/var/www/html/Blockly-gPIo"
  chown -R www-data:www-data "/var/www/html/Blockly-gPIo"
  ```
## Pre-installed Image

The program is also pre-installed in our Raspjamming OS image. It can be used for all Raspberry Pi Boards.
Please take a look at our GutHub repository [Raspjamming OS](https://github.com/GrazerComputerClub/Raspjamming-OS).

## How to use
Just open [github web](https://grazercomputerclub.github.io/Blockly-gPIo/) with your favourite browser and press RUN button.  
The button will open [blockly-gpio](http://strohmayers.com/Blockly-gPIo/) on a different domain, because its not working with github ssl webpage.  
But feel free to install blockly-gpio on a local or different webserver and open that webpage with your browser.  
Now use simulation mode or go to settings and enter IP address of your Raspberry Pi running the service (see installation second point). The play button will start the programm (on Raspberry Pi if configured). 


## Future tasks
* wss support (https)
* Port scanner to find available servers
* Dark theme
