/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Description.
 */
'use strict';

/** Common HSV hue for all blocks in this file. */
var GPIO_HUE = 250;

var PINS = [['2', '3'],
            ['3', '5'],
            ['4', '7'],    ['14', '8'],
                           ['15', '10'],
            ['17', '11'],  ['18', '12'],
            ['27', '13'],
            ['22', '15'],  ['23', '16'],
                           ['24', '18'],
            ['10', '19'],
            ['9', '21'],   ['25', '22'],
            ['11', '23'],  ['8', '24'],
                           ['7', '26'],

            ['5', '29'],
            ['6', '31'],   ['12', '32'],
            ['13', '33'],
            ['19', '35'],  ['16', '36'],
            ['26', '37'],  ['20', '38'],
                           ['21', '40']
           ];

Blockly.Blocks['led_set'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendValueInput('STATE', 'pin_value')
        .appendField('set LED on pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('to')
        .setCheck('pin_value');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['led_set'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var state = Blockly.JavaScript.valueToCode(
      block, 'STATE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  state = (state === 'HIGH') ? 'true' : 'false';
  var code = 'setDiagramPin(' + pin + ', ' + state + ');\n';
  return code;
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['led_set'] = function(block) {
  var pin = block.getFieldValue('PIN');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == pin) {
      pin = PINS[i][0];
      break;
    }
  }
  var state = Blockly.Python.valueToCode(
      block, 'STATE', Blockly.Python.ORDER_ATOMIC) || '0';

  Blockly.Python.definitions_['import_gpiozero_led'] = 'from gpiozero import LED';
  Blockly.Python.definitions_['declare_led' + pin] =
      'led' + pin + ' = LED(' + pin + ')';

  var code = 'led' + pin + '.'
  if (state == 'HIGH') {
    code += 'on()\n';
  } else {
    code += 'off()\n';
  }
  return code;
};

Blockly.Blocks['btn_wait_for'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput()
        .appendField('wait for pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField(' (button) pressed')
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['btn_wait_for'] = function(block) {
  var code = 'delayMs(1000);\n';
  return code;
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['btn_wait_for'] = function(block) {
  var pin = block.getFieldValue('PIN');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == pin) {
      pin = PINS[i][0];
      break;
    }
  }

  Blockly.Python.definitions_['import_gpiozero_button'] = 'from gpiozero import Button';
  Blockly.Python.definitions_['declare_button' + pin] =
      'button' + pin + ' = Button(' + pin + ', pull_up=False)';

  var code = 'button' + pin + '.wait_for_press()\n';
  return code;
};

Blockly.Blocks['btn_pressed'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("button on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField("is pressed");
    this.setOutput(true);
    this.setColour(GPIO_HUE);
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['btn_pressed'] = function(block) {
  var code = 'True\n'; // return some dummy result values
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['btn_pressed'] = function(block) {
  var pin = block.getFieldValue('PIN');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == pin) {
      pin = PINS[i][0];
      break;
    }
  }

  Blockly.Python.definitions_['import_gpiozero_button'] = 'from gpiozero import Button';
  Blockly.Python.definitions_['declare_button' + pin] =
      'button' + pin + ' = Button(' + pin + ', pull_up=False)';

  var code = 'button' + pin + '.is_pressed';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['pin_binary'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput('')
        .appendField(
            new Blockly.FieldDropdown([['HIGH', 'HIGH'], ['LOW', 'LOW']]),
           'STATE');
    this.setOutput(true, 'pin_value');
    this.setTooltip('Set a pin state logic High or Low.');
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.JavaScript['pin_binary'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Python['pin_binary'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Blocks['gc2'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("GC2 xHAT v1.0 Demo")
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("GC2 xHAT");
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2'] = function(block) {
  var code = 'jsPrint(Run GC2 xHAT v1.0 demo);\n';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2'] = function(block) {
  Blockly.Python.definitions_['import_dht22'] = 'from dhtxx import DHT22';
  Blockly.Python.definitions_['declare_dht22_pin22'] =
      'dht22_pin22 = DHT22(22)';
  Blockly.Python.definitions_['import_tm1637'] = 'from tm1637 import TM1637';
  var display = 'tm1637_2324';
  Blockly.Python.definitions_['declare_' + display] = display + ' = TM1637(clk=23, dio=24)';

  var code = display + '.number(42)\n';
  //var code = 'dht22_pin' + pin + '.get_result_once()';
  //TM1637 dio=24, clk=23
  //led red 16
  //led yellow 20
  //led green 21
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['dht22'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Measure with DHT22 on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    this.setOutput(true, "Array");
    this.setColour(GPIO_HUE);
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip("DHT22 temperature-humidity sensor");
    this.setHelpUrl("https://www.adafruit.com/product/385");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['dht22'] = function(block) {
  var code = '[21.7, 63.42]\n'; // return some dummy result values
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['dht22'] = function(block) {
  var pin = block.getFieldValue('PIN');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == pin) {
      pin = PINS[i][0];
      break;
    }
  }
  Blockly.Python.definitions_['import_dht22'] = 'from dhtxx import DHT22';
  Blockly.Python.definitions_['declare_dht22_pin' + pin] =
      'dht22_pin' + pin + ' = DHT22(' + pin + ')';
  var code = 'dht22_pin' + pin + '.get_result_once()';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};



Blockly.Blocks['dht11'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Measure with DHT11 on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    this.setOutput(true, "Array");
    this.setColour(GPIO_HUE);
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip("DHT11 temperature-humidity sensor");
    this.setHelpUrl("https://www.adafruit.com/product/385");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['dht11'] = function(block) {
  var code = '[21.7, 63.42]\n'; // return some dummy result values
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['dht11'] = function(block) {
  var pin = block.getFieldValue('PIN');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == pin) {
      pin = PINS[i][0];
      break;
    }
  }
  Blockly.Python.definitions_['import_dht11'] = 'from dhtxx import dht11';
  Blockly.Python.definitions_['declare_dht11_pin' + pin] =
      'dht11_pin' + pin + ' = DHT11(' + pin + ')';
  var code = 'dht11_pin' + pin + '.get_result_once()';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};


Blockly.Blocks['hc_sr04'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Measure distance with HC_SR04");
    this.appendDummyInput()
        .appendField("ECHO on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'ECHO');
    this.appendDummyInput()
        .appendField("TRIGGER on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'TRIGGER');
    this.setOutput(true, "Number");
    this.setColour(GPIO_HUE);
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip("Ultrasonic Sensor - HC-SR04");
    this.setHelpUrl("https://www.sparkfun.com/products/13959");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['hc_sr04'] = function(block) {
  var code = '42.42\n'; // return some dummy result values
  return [code, Blockly.JavaScript.ORDER_MEMBER];;
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['hc_sr04'] = function(block) {
  var echo = block.getFieldValue('ECHO');
  var trigger = block.getFieldValue('TRIGGER');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == echo) {
      echo = PINS[i][0];
      break;
    }
  }
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == trigger) {
      trigger = PINS[i][0];
      break;
    }
  }
  Blockly.Python.definitions_['import_gpiozero_hcsr04'] = 'from gpiozero import DistanceSensor';
  var sensor = 'hc_sr04_' + echo + trigger;
  Blockly.Python.definitions_['declare_' + sensor] = sensor + ' = DistanceSensor(echo=' + echo + ', trigger=' + trigger + ')';
  var code = 'round(' + sensor + '.distance*100)';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};


Blockly.Blocks['tm1637'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Write data to TM1637 display with");
    this.appendDummyInput()
        .appendField("CLK on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
    this.appendDummyInput()
        .appendField("DIO on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
    this.appendValueInput("DATA")
        .appendField("and data")
        .setCheck("Array");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
    this.setTooltip("7-segment display with TM1637 chip");
    this.setHelpUrl("https://playground.arduino.cc/Main/TM1637");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['tm1637'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'DATA',
      Blockly.JavaScript.ORDER_NONE) || '';
  return "jsPrint('TM1637 data values: " + argument0 + "');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['tm1637'] = function(block) {
  var clk = block.getFieldValue('CLK');
  var dio = block.getFieldValue('DIO');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == clk) {
      clk = PINS[i][0];
      break;
    }
  }
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == dio) {
      dio = PINS[i][0];
      break;
    }
  }
  var argument0 = Blockly.Python.valueToCode(block, 'DATA',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';

  Blockly.Python.definitions_['import_tm1637'] = 'from tm1637 import TM1637';
  var display = 'tm1637_' + clk + dio;
  Blockly.Python.definitions_['declare_' + display] = display + ' = TM1637(clk=' + clk + ', dio=' + dio + ')';
  var code = display + '.write(' + argument0 + ')\n';
  return code;
};


Blockly.Blocks['tm1637_number'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Write number to TM1637 display with");
    this.appendDummyInput()
        .appendField("CLK on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
    this.appendDummyInput()
        .appendField("DIO on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
    this.appendValueInput("DATA")
        .appendField("and number")
        .setCheck("Number");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
    this.setTooltip("7-segment display with TM1637 chip");
    this.setHelpUrl("https://playground.arduino.cc/Main/TM1637");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['tm1637_number'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'DATA',
      Blockly.JavaScript.ORDER_NONE) || '';
  return "jsPrint('TM1637 data values: " + argument0 + "');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['tm1637_number'] = function(block) {
  var clk = block.getFieldValue('CLK');
  var dio = block.getFieldValue('DIO');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == clk) {
      clk = PINS[i][0];
      break;
    }
  }
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == dio) {
      dio = PINS[i][0];
      break;
    }
  }
  var argument0 = Blockly.Python.valueToCode(block, 'DATA',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';

  Blockly.Python.definitions_['import_tm1637'] = 'from tm1637 import TM1637';
  var display = 'tm1637_' + clk + dio;
  Blockly.Python.definitions_['declare_' + display] = display + ' = TM1637(clk=' + clk + ', dio=' + dio + ')';
  var code = display + '.number(' + argument0 + ')\n';
  return code;
};


Blockly.Blocks['tm1637_numbers'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Write numbers to TM1637 display with");
    this.appendDummyInput()
        .appendField("CLK on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
    this.appendDummyInput()
        .appendField("DIO on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
    this.appendValueInput("NR0")
        .appendField("and number left half")
        .setCheck("Number");
    this.appendValueInput("NR1")
        .appendField("and number right half")
        .setCheck("Number");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
    this.setTooltip("7-segment display with TM1637 chip");
    this.setHelpUrl("https://playground.arduino.cc/Main/TM1637");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['tm1637_numbers'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'NR0',
      Blockly.JavaScript.ORDER_NONE) || '';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'NR1',
      Blockly.JavaScript.ORDER_NONE) || '';
  return "jsPrint('TM1637 data values: " + argument0 + ',' + argument1 + "');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['tm1637_numbers'] = function(block) {
  var clk = block.getFieldValue('CLK');
  var dio = block.getFieldValue('DIO');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == clk) {
      clk = PINS[i][0];
      break;
    }
  }
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == dio) {
      dio = PINS[i][0];
      break;
    }
  }
  var argument0 = Blockly.Python.valueToCode(block, 'NR0',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.Python.valueToCode(block, 'NR1',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';

  Blockly.Python.definitions_['import_tm1637'] = 'from tm1637 import TM1637';
  var display = 'tm1637_' + clk + dio;
  Blockly.Python.definitions_['declare_' + display] = display + ' = TM1637(clk=' + clk + ', dio=' + dio + ')';
  var code = display + '.numbers(' + argument0 + ',' + argument1 + ')\n';
  return code;
};


Blockly.Blocks['tm1637_temperature'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Write temperature to TM1637 display with");
    this.appendDummyInput()
        .appendField("CLK on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
    this.appendDummyInput()
        .appendField("DIO on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
    this.appendValueInput("DATA")
        .appendField("and temperature")
        .setCheck("Number");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
    this.setTooltip("7-segment display with TM1637 chip");
    this.setHelpUrl("https://playground.arduino.cc/Main/TM1637");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['tm1637_temperature'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'DATA',
      Blockly.JavaScript.ORDER_NONE) || '';
  return "jsPrint('TM1637 data values: " + argument0 + "');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['tm1637_temperature'] = function(block) {
  var clk = block.getFieldValue('CLK');
  var dio = block.getFieldValue('DIO');
  // Very hackish way to get the BMC pin number, need to create a proper look
  // up dicionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == clk) {
      clk = PINS[i][0];
      break;
    }
  }
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] == dio) {
      dio = PINS[i][0];
      break;
    }
  }
  var argument0 = Blockly.Python.valueToCode(block, 'DATA',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';

  Blockly.Python.definitions_['import_tm1637'] = 'from tm1637 import TM1637';
  var display = 'tm1637_' + clk + dio;
  Blockly.Python.definitions_['declare_' + display] = display + ' = TM1637(clk=' + clk + ', dio=' + dio + ')';
  var code = display + '.temperature(' + argument0 + ')\n';
  return code;
};


