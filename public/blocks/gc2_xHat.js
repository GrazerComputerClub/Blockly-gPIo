
Blockly.Blocks['gc2'] = {
  // TODO
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

