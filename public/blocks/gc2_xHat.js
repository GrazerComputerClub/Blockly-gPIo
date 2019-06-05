/*
 * xHat Features:
 * - DHT11
 * -- read temp
 * -- read humidity
 * - Traffic light
 * --- set to (red, yellow, green, off)
 * - switch
 * -- wait pressed (left, center, right)
 * - tm1637 display
 * -- print number
 * - hc_sr04
 * -- get distance
 * - buzzer
 * -- beep
 *
 * Blocks:
 *  -) get temperature (dht11)
 *  -) get humidity (dht11)
 *  -) get distance (hc-sr04)
 *  -) wait until switch is pressed (left, center, right)
 *  -) write number ___ to display
 *  -) make noise (beep)
 *  -) set traffic light (red, yellow green, off)
 *
 * Doc.: https://github.com/GrazerComputerClub/GC2-xHAT
 */

Blockly.Blocks['gc2_xHat_dht11_temp'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Liest die Temperatur über den DHT11");
      this.appendDummyInput()
          .appendField("hole Temperatur")
    } else {
      this.setTooltip("Reads the temperature from the DHT11");
      this.appendDummyInput()
          .appendField("get temperature")
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setOutput(true, "Number");
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_dht11_temp'] = function(block) {
  var code = '42';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_dht11_temp'] = function(block) {
  Blockly.Python.definitions_['import_dht11'] = 'from dhtxx import DHT11';
  Blockly.Python.definitions_['declare_dht11_pin22'] = 'dht11_pin22 = DHT11(22)';
  var code = 'dht11_pin22.get_result(max_tries=10)[0]';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['gc2_xHat_dht11_hum'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Liest die Luftfeuchtigkeit über den DHT11");
      this.appendDummyInput()
          .appendField("hole Luftfeuchtigkeit")
    } else {
      this.setTooltip("Reads the humidity from the DHT11");
      this.appendDummyInput()
          .appendField("get humidity")
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setOutput(true, "Number");
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_dht11_hum'] = function(block) {
  var code = '42.42';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_dht11_hum'] = function(block) {
  Blockly.Python.definitions_['import_dht11'] = 'from dhtxx import DHT11';
  Blockly.Python.definitions_['declare_dht11_pin22'] = 'dht11_pin22 = DHT11(22)';
  var code = 'dht11_pin22.get_result(max_tries=10)[1]';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['gc2_xHat_hc_sr04_dist'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Liest die Distanz vom HC-SR04");
      this.appendDummyInput()
          .appendField("hole Distanz")
    } else {
      this.setTooltip("Reads the distance from the HC-SR04");
      this.appendDummyInput()
          .appendField("get distance")
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setOutput(true, "Number");
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_hc_sr04_dist'] = function(block) {
  var code = '99';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_hc_sr04_dist'] = function(block) {
  Blockly.Python.definitions_['import_gpiozero_hcsr04'] = 'from gpiozero import DistanceSensor';
  var sensor = 'hc_sr04_2717';
  Blockly.Python.definitions_['declare_' + sensor] = sensor + ' = DistanceSensor(echo=27, trigger=17)';
  var code = 'round(' + sensor + '.distance*100)';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['gc2_xHat_buttons'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Wartet bis Taster gedrückt wird");
      this.appendDummyInput()
          .appendField("warte auf Tastendruck")
          .appendField(
              new Blockly.FieldDropdown(
                [ ['Links', '13'], 
                  ['Mitte', '19'],
                  ['Rechts', '26']]),
             'POSITION');
    } else {
      this.setTooltip("Waits till button is pressed");
      this.appendDummyInput()
          .appendField("wait for button pressed")
          .appendField(
              new Blockly.FieldDropdown(
                [ ['Left', '13'], 
                  ['Center', '19'],
                  ['Right', '26']]),
             'POSITION');
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_buttons'] = function(block) {
  var code = 'delayMs(1000);\n';
  return code;
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_buttons'] = function(block) {
  // left == 13, center == 19, right == 26
  var pin = block.getFieldValue('POSITION');
  Blockly.Python.definitions_['import_gpiozero_button'] = 'from gpiozero import Button';
  Blockly.Python.definitions_['declare_button' + pin] =
      'button' + pin + ' = Button(' + pin + ', pull_up=False)';

  var code = 'button' + pin + '.wait_for_press()\n';
  return code;
};

Blockly.Blocks['gc2_xHat_tm1637_write'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Schreibe ein Zahl auf das Display");
      this.appendValueInput('NUM', 'Number')
          .setCheck('Number')
          .appendField("schreibe Zahl");
      this.appendDummyInput()
          .appendField("auf das Dispaly");
    } else {
      this.setTooltip("Write a number on the display");
      this.appendValueInput('NUM', 'Number')
          .setCheck('Number')
          .appendField("write number");
      this.appendDummyInput()
          .appendField("to display");
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_tm1637_write'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'NUM',
      Blockly.JavaScript.ORDER_NONE) || '';
  return IsGerman() ? "jsPrint('TM1637 Wert: " + argument0 + "');\n" :
    "jsPrint('TM1637 data values: " + argument0 + "');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_tm1637_write'] = function(block) {
  var number = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
  Blockly.Python.definitions_['import_tm1637'] = 'from tm1637 import TM1637';
  var display = 'tm1637_2324';
  Blockly.Python.definitions_['declare_' + display] = display + ' = TM1637(clk=23, dio=24)';
  var code = display + '.number(' + number + ')\n';
  return code;
};

Blockly.Blocks['gc2_xHat_beep'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Mache lärm mit dem Buzzer");
      this.appendValueInput('NUM', 'Number')
          .setCheck('Number')
          .appendField("mache Beep");
      this.appendDummyInput()
          .appendField("mal");
    } else {
      this.setTooltip("Make noise with the buzzer");
      this.appendValueInput('NUM', 'Number')
          .setCheck('Number')
          .appendField("beep");
      this.appendDummyInput()
          .appendField("times");
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_beep'] = function(block) {
  return "jsPrint('Beep :)');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_beep'] = function(block) {
  var number = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC) || '0';
  Blockly.Python.definitions_['import_buzzer'] = 'from gpiozero import Buzzer';
  var buzzer = 'buzzer_18';
  Blockly.Python.definitions_['declare_' + buzzer] = buzzer + ' = Buzzer(18)';
  var code = buzzer + '.beep(n=' + number + ')\n';
  return code;
};

Blockly.Blocks['gc2_xHat_trafficlight'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    if (IsGerman()) {
      this.setTooltip("Schalte eine Ampel");
      this.appendDummyInput()
          .appendField("schalte Ampel auf")
          .appendField(
              new Blockly.FieldDropdown(
                [ ['Aus', '0'],
                  ['Grün', '1'], 
                  ['Gelb', '2'],
                  ['Rot', '3']]),
             'LIGHT');
    } else {
      this.setTooltip("Control a traffic light");
      this.appendDummyInput()
          .appendField("schalte Ampel auf")
          .appendField(
              new Blockly.FieldDropdown(
                [ ['Off', '0'],
                  ['Green', '1'], 
                  ['Amber', '2'],
                  ['Red', '3']]),
             'LIGHT');
    }
    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setHelpUrl("https://github.com/GrazerComputerClub");
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.JavaScript['gc2_xHat_trafficlight'] = function(block) {
  var lightState = block.getField('LIGHT').getText();
  return IsGerman() ? "jsPrint('Ampel ist " + lightState + "');\n" 
    : "jsPrint('Traffic light is " + lightState + "');\n";
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['gc2_xHat_trafficlight'] = function(block) {
  var lightState = block.getFieldValue('LIGHT');
  Blockly.Python.definitions_['import_gpiozero_trafficlight'] = 'from gpiozero import TrafficLights';
  Blockly.Python.definitions_['declare_trafficlight162021'] = 'trafficlight162021 = TrafficLights(16, 20, 21)';

  var greenState = (lightState == '1') ? 'on()' : 'off()';
  var amberState = (lightState == '2') ? 'on()' : 'off()';
  var redState = (lightState == '3') ? 'on()' : 'off()';
  var code = 'trafficlight162021.green.' + greenState + '\n'
      + 'trafficlight162021.amber.' + amberState + '\n'
      + 'trafficlight162021.red.' + redState + '\n';
  return code;
};

