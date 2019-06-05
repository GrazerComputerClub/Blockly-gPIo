
Blockly.Blocks['hc_sr04'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Ultraschallsensor - HC-SR04");
      this.appendDummyInput()
          .appendField("miss Entfernung mit HC_SR04");
      this.appendDummyInput()
          .appendField("ECHO auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'ECHO');
      this.appendDummyInput()
          .appendField("TRIGGER auf pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'TRIGGER');
    } else {
      this.setTooltip("Ultrasonic Sensor - HC-SR04");
      this.appendDummyInput()
          .appendField("measure distance with HC_SR04");
      this.appendDummyInput()
          .appendField("ECHO on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'ECHO');
      this.appendDummyInput()
          .appendField("TRIGGER on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'TRIGGER');
    }
    this.setOutput(true, "Number");
    this.setColour(GPIO_HUE);
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
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

