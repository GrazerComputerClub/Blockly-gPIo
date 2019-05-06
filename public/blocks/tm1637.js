
Blockly.Blocks['tm1637'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("7-Segment Display mit TM1637 Chip");
      this.appendDummyInput()
          .appendField("sende Daten zum TM1637 Display mit");
      this.appendDummyInput()
          .appendField("CLK auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("DATA")
          .appendField("und Daten")
          .setCheck("Array");
    } else {
      this.setTooltip("7-segment display with TM1637 chip");
      this.appendDummyInput()
          .appendField("send data to TM1637 display with");
      this.appendDummyInput()
          .appendField("CLK on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("DATA")
          .appendField("and data")
          .setCheck("Array");
    }
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
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
    if (IsGerman()) {
      this.setTooltip("7-Segment Display mit TM1637 Chip");
      this.appendDummyInput()
          .appendField("schreibe Zahl auf das TM1637 Display mit");
      this.appendDummyInput()
          .appendField("CLK auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("DATA")
          .appendField("und Zahl")
          .setCheck("Number");
    } else {
      this.setTooltip("7-segment display with TM1637 chip");
      this.appendDummyInput()
          .appendField("write number to TM1637 display with");
      this.appendDummyInput()
          .appendField("CLK on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("DATA")
          .appendField("and number")
          .setCheck("Number");
    }
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
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
    if (IsGerman()) {
      this.setTooltip("7-Segment Display mit TM1637 Chip");
      this.appendDummyInput()
          .appendField("schreibe Zahlen auf das TM1637 display mit");
      this.appendDummyInput()
          .appendField("CLK auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("NR0")
          .appendField("und Nummer (linke Hälfte)")
          .setCheck("Number");
      this.appendValueInput("NR1")
          .appendField("und Nummer (rechte Hälfte)")
          .setCheck("Number");
    } else {
      this.setTooltip("7-segment display with TM1637 chip");
      this.appendDummyInput()
          .appendField("write numbers to TM1637 display with");
      this.appendDummyInput()
          .appendField("CLK on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("NR0")
          .appendField("and number (left half)")
          .setCheck("Number");
      this.appendValueInput("NR1")
          .appendField("and number (right half)")
          .setCheck("Number");
    }
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
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
    if (IsGerman()) {
      this.setTooltip("7-Segment Display mit TM1637 Chip");
      this.appendDummyInput()
          .appendField("schreibe Temperatur auf das TM1637 display mit ");
      this.appendDummyInput()
          .appendField("CLK auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("DATA")
          .appendField("und Temperatur")
          .setCheck("Number");
    } else {
      this.setTooltip("7-segment display with TM1637 chip");
      this.appendDummyInput()
          .appendField("write temperature to TM1637 display with");
      this.appendDummyInput()
          .appendField("CLK on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'CLK');
      this.appendDummyInput()
          .appendField("DIO on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'DIO');
      this.appendValueInput("DATA")
          .appendField("and temperature")
          .setCheck("Number");
    }
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE);
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

