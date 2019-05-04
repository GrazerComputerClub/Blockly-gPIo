
function saveWork() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  var blob = new Blob([xmlText], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "work.xml");
  //var filename = 'work.xml'
  //var pom = document.createElement('a');
  //pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlText));
  //if (filename) {
  //        pom.setAttribute('download', filename);
  //}
  //pom.click();
};

function loadWork() {
	var pom = document.createElement('input');
  pom.setAttribute('type', 'file');
  pom.setAttribute('name', 'name');

  pom.onchange = function(evt) {
    var file = pom.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        try {
          var dom = Blockly.Xml.textToDom(reader.result);
          Blockly.mainWorkspace.clear();
          Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
        } catch (e) {
          alert("Invalid xml");
        }
      }
      reader.onerror = function (evt) {
        alert("Couldn't read file");
      }
      reader.readAsText(file, "UTF-8");
    }
  }

	pom.click();
}

