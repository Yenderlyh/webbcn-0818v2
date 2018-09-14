'use strict';

const main = (students) => {
  var nodes = document.querySelectorAll('section h2');
  for (var ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', function (event) {
      var h2 = event.currentTarget;
      var section = h2.parentNode;
      section.classList.toggle('expanded');
    });
  };

  function findStudents (terms) {
    var results = [];
    if (terms) {
      results = students.filter(function (item) {
        return item.name.toLowerCase().indexOf(terms) >= 0;
      });
    };
    return results;
  }

  function displayResults (results) {
    var searchResults = document.querySelector('.quick-nav .search-results');
    var ul = document.createElement('ul');
    searchResults.innerHTML = '';
    results.forEach(function (student) {
      var link = document.createElement('a');
      var li = document.createElement('li');
      link.innerText = student.name;
      link.setAttribute('href', student.url);
      li.appendChild(link);
      ul.appendChild(li);

      searchResults.appendChild(li);
    });
  }

  function handleChange () {
    var searchTerms = input.value.toLowerCase();
    var results = findStudents(searchTerms);
    displayResults(results);
  };

  var input = document.querySelector('.search input');
  input.addEventListener('keyup', handleChange);
};

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
