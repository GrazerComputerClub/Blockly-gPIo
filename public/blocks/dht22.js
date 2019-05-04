
Blockly.Blocks['dht22'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.appendDummyInput()
          .appendField("miss Temperatur und Feuchtigkeit mit DHT22 am pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
      this.setTooltip("DHT22 Temperatur- und Feuchtigkeitssensor");
    } else {
      this.appendDummyInput()
          .appendField("measure temperature and humidity with DHT22 on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
      this.setTooltip("DHT22 temperature and humidity sensor");
    }
    this.setOutput(true, "Array");
    this.setColour(GPIO_HUE);
    this.setInputsInline(false);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
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

