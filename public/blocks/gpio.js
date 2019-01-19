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


Blockly.Blocks['dht22'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("DHT22 measure on pin#")
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
  return [code, Blockly.JavaScript.ORDER_MEMBER];;
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



Blockly.Blocks['hc_sr04'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("HC_SR04 echo on pin#")
        .appendField(new Blockly.FieldDropdown(PINS), 'ECHO')
        .appendField(" and trigger on pin#")
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
    }
    if (PINS[i][1] == trigger) {
      trigger = PINS[i][0];
    }
  }
  Blockly.Python.definitions_['import_gpiozero_hcsr04'] = 'from gpiozero import DistanceSensor';
  var sensor = 'hc_sr04_' + echo + trigger;
  Blockly.Python.definitions_['declare_' + sensor] = 'DistanceSensor(echo=' + echo + ', trigger=' + trigger + ')';
  var code = 'round(' + sensor + '.distance*100)';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

