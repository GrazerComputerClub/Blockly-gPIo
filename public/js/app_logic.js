/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Description.
 */
'use strict';

var Bgpio = Bgpio || {};

Bgpio.workspace = null;
Bgpio.DEBUG = true;
Bgpio.PIN_COUNT = 40;

function IsGerman() {
  var langCode = document.documentElement.lang;
  if (langCode == "de")  {
    return true;
  }
  return false;
}

Bgpio.init = function () {
    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');
    var blocklyMainMenu = document.getElementById('mainMenu');
    Bgpio.workspace = Blockly.inject(blocklyDiv, {
        media: 'blockly/media/'
        , toolbox: document.getElementById('toolbox')
        , comments: true
        , horizontalLayout: false
        , toolboxPosition: 'start'
        , css: true
        , grid: {
            spacing: 20
            , length: 3
            , colour: '#ccc'
            , snap: true
        }
        , trashcan: true
        , zoom: {
            controls: true
            , wheel: true
            , startScale: 1.0
            , maxScale: 3
            , minScale: 0.3
            , scaleSpeed: 1.2
        }
    });
    var onresize = function (e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.position = 'absolute';
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight - blocklyMainMenu.offsetHeight + 'px';
        Blockly.svgResize(Bgpio.workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(Bgpio.workspace);
    Blockly.Xml.domToWorkspace(Bgpio.workspace
        , document.getElementById('startBlocks'));
    Bgpio.workspace.addChangeListener(Bgpio.renderPythonCode);

    Bgpio.clearJsConsole();
};

window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    Bgpio.init();
});

Bgpio.runMode = {
    selected: 0
    , types: ['Simulation', 'Execution']
    , connectionAdr: ''
    , getSelectedMode: function () {
        return this.types[this.selected];
    }
    , selectMode: function (id) {
        this.selected = id;
        this.updateState_();
    }
    , selectNextMode: function (mode) {
        this.selected = mode;
        if (this.selected >= this.types.length) this.selected = 0;
        this.updateState_();
    }
    , debugInit: Bgpio.JsInterpreter.debugInit
    , debugStep: Bgpio.JsInterpreter.debugStep
    , run: Bgpio.JsInterpreter.run
    , stop: Bgpio.JsInterpreter.stop
    , updateState_: function () {
        var modeIcon = document.getElementById('modeIcon');
        if (Bgpio.runMode.selected == 0) {
            modeIcon.classList.remove("fab");
            modeIcon.classList.remove("fa-raspberry-pi");
            modeIcon.classList.add("fas");
            modeIcon.classList.add("fa-bug");
            document.getElementById('runButton').setAttribute("onclick", "Bgpio.runMode.run()");
            document.getElementById("debugInitButton").style.visibility = "visible";
            document.getElementById("debugStepButton").style.visibility = "visible";
        } else {
            modeIcon.classList.remove("fas");
            modeIcon.classList.remove("fa-bug");
            modeIcon.classList.add("fab");
            modeIcon.classList.add("fa-raspberry-pi");

            // remove debug button because 
            // those are not implemented in RPi run-mode
            document.getElementById('runButton').setAttribute("onclick", "Bgpio.runMode.run()");
            document.getElementById("debugInitButton").style.visibility = "hidden";
            document.getElementById("debugStepButton").style.visibility = "hidden";
        }
        var simulationContent = document.getElementById('simulationContentDiv');
        var executionContent = document.getElementById('executionContentDiv');
        if (this.selected === 0) {
            simulationContent.style.display = 'block';
            executionContent.style.display = 'none';
            this.debugInit = Bgpio.JsInterpreter.debugInit;
            this.debugStep = Bgpio.JsInterpreter.debugStep;
            this.run = Bgpio.JsInterpreter.run;
            this.stop = Bgpio.JsInterpreter.stop;
            document.getElementById('debugInitButton').disabled = false;
        } else {
            simulationContent.style.display = 'none';
            executionContent.style.display = 'block';
            this.debugInit = Bgpio.PythonInterpreter.debugInit;
            this.debugStep = Bgpio.PythonInterpreter.debugStep;
            this.run = Bgpio.PythonInterpreter.run;
            this.stop = Bgpio.PythonInterpreter.stop;
            document.getElementById('debugInitButton').disabled = true;
        }
    }
, };

/*******************************************************************************
 * Blockly related
 ******************************************************************************/
Bgpio.generateJavaScriptCode = function () {
    return Blockly.JavaScript.workspaceToCode(Bgpio.workspace);
};

Bgpio.generatePythonCode = function () {
    return Blockly.Python.workspaceToCode(Bgpio.workspace);
};

Bgpio.generateXml = function () {
    var xmlDom = Blockly.Xml.workspaceToDom(Bgpio.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    return xmlText;
};

Bgpio.renderPythonCode = function (event) {
    // Only regenerate the code if a block is not being dragged
    /*if (event.type == Blockly.Events.MOVE
      || event.type == Blockly.Events.UI) {
        return;
    }*/
    // Render Python Code with latest change highlight and syntax highlighting
    var pyPre = document.getElementById('pythonCodePre');
    pyPre.textContent = Bgpio.generatePythonCode();
    pyPre.innerHTML = prettyPrintOne(pyPre.innerHTML, 'py', false);
};

/*******************************************************************************
 *  Right content related
 ******************************************************************************/
Bgpio.setPinDefaults = function () {
    for (var i = 1; i <= Bgpio.PIN_COUNT; i++) {
        document.getElementById('pin' + i).className = 'pinDefault';
    }
};

Bgpio.setPinDigital = function (pinNumber, isPinHigh) {
    var pin = document.getElementById('pin' + pinNumber);
    pin.className = isPinHigh ? 'pinDigitalHigh' : 'pinDigitalLow';
};

Bgpio.appendTextJsConsole = function (text) {
    var consoleId = (Bgpio.runMode.getSelectedMode() == Bgpio.runMode.types[1]) ?
        'pythonConsolePre' : 'jsConsolePre';
    if (Bgpio.DEBUG) console.log('Print in console with id: ' + consoleId);
    var jsConsole = document.getElementById(consoleId);
    jsConsole.textContent += text + '\n';
};

Bgpio.clearJsConsole = function (text) {
    var consoleId = (Bgpio.runMode.getSelectedMode() == Bgpio.runMode.types[1]) ?
        'pythonConsolePre' : 'jsConsolePre';
    if (Bgpio.DEBUG) console.log('Clear console with id: ' + consoleId);
    var jsConsole = document.getElementById(consoleId);
    if (Bgpio.runMode.getSelectedMode() == Bgpio.runMode.types[0])
        jsConsole.textContent = IsGerman() ? 'Simulierte Ausgabe.\n' : 'Simulated print output.\n';
    else
        jsConsole.textContent = '';
};

/*******************************************************************************
 * Other
 ******************************************************************************/
Bgpio.getRaspPiIp = function () {
    //var ipField = document.getElementById('raspPiIp');
    var ip = Bgpio.runMode.connectionAdr;
    var altIp = document.getElementById('altIP');
    if (altIp.value != "") {
        return altIp.value;
    } else if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) || ip.toLowerCase() == 'localhost' || ip.toLowerCase() == 'raspberrypi.local' || ip.toLowerCase() == 'bananapi.local') {
        return ip;
    }
    return null;
};
