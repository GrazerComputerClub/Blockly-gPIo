
function saveWork() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  var filename = 'work.xml'
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlText));
	if (filename) {
		element.setAttribute('download', filename);
	}
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
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

