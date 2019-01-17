
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("modeBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function switchToSimulation() {
  modal.style.display = "none";
  Bgpio.runMode.selectMode(0);
}

function switchToExecution() {
  modal.style.display = "none";
  Bgpio.runMode.connectionAdr = document.getElementById('adrSelector').value;
  Bgpio.runMode.selectMode(1);
}

