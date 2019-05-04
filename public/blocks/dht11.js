
Blockly.Blocks['dht11'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("DHT11 Temperatur- und Feuchtigkeitssensor");
      this.appendDummyInput()
          .appendField("miss Temperatur und Feuchtigkeit mit DHT11 am pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    } else {
      this.setTooltip("DHT11 temperature-humidity sensor");
      this.appendDummyInput()
          .appendField("measure temperature and humidity with DHT11 on pin#")
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
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
  Blockly.Python.definitions_['import_dht11'] = 'from dhtxx import DHT11';
  Blockly.Python.definitions_['declare_dht11_pin' + pin] =
      'dht11_pin' + pin + ' = DHT11(' + pin + ')';
  var code = 'dht11_pin' + pin + '.get_result_once()';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

