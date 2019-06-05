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
    if (IsGerman()) {
      this.appendValueInput('STATE', 'pin_value')
          .appendField('schalte LED am pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField('auf')
          .setCheck('pin_value');
    } else {
      this.appendValueInput('STATE', 'pin_value')
          .appendField('set LED on pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField('to')
          .setCheck('pin_value');
    }
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
    if (IsGerman()) {
      this.appendDummyInput()
          .appendField('warte bis pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField(' (Taste) gedrückt')
    } else {
      this.appendDummyInput()
          .appendField('wait for pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField(' (button) pressed')
    }
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
    if (IsGerman()) {
      this.appendDummyInput()
          .appendField("Taster am pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField("ist gedrückt");
    } else {
      this.appendDummyInput()
          .appendField("button on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField("is pressed");
    }
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
    if (IsGerman()) {
      this.setTooltip('Setze den logischen Zustand eines Pins auf "High" oder "Low".');
    } else {
      this.setTooltip('Set a pin state logic High or Low.');
    }
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

