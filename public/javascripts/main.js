'use strict';

function main() {
  var nodes = document.querySelectorAll('section h2');

  for (var ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', function (event) {
      var h2 = event.currentTarget;
      var section = h2.parentNode;
      section.classList.toggle('expanded');
    });
  };
}

window.addEventListener('load', main);