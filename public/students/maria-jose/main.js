'use strict';
// -------- toggle experiments --------
const main = (students) => {
  const node = document.querySelector('section.experiments h2');
  node.addEventListener('click', (event) => {
    const parent = event.currentTarget.parentNode;
    const div = parent.querySelector('div');
    div.classList.toggle('hidden');
    const expand = parent.querySelector('.expand');
    const collapse = parent.querySelector('.collapse');
    expand.classList.toggle('hidden');
    collapse.classList.toggle('hidden');
  });

  // -------- search bar --------

  const findStudents = (terms) => {
    let results = [];
    if (terms) {
      results = students.filter(student => {
        return student.name.toLowerCase().indexOf(terms) >= 0;
      });
    };
    return results;
  };

  const displayResults = (results) => {
    const ul = document.createElement('ul');
    results.forEach(student => {
      const link = document.createElement('a');
      link.innerText = student.name;
      link.setAttribute('href', student.url);

      const li = document.createElement('li');
      li.appendChild(link);
      ul.appendChild(li);
    });

    searchResults.appendChild(ul);
  };

  const handleChange = () => {
    const searchTerms = input.value.toLowerCase();
    const results = findStudents(searchTerms);
    displayResults(results);
  };

  const input = document.querySelector('.search input');
  input.addEventListener('keyup', handleChange);

  const searchResults = document.querySelector('.search .search-results');
  document.body.addEventListener('click', () => {
    searchResults.innerHTML = '';
  });

  input.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  input.addEventListener('focus', handleChange);

  // -------- timer --------

  let timeLeft = 30;
  const p = document.createElement('p');
  const timer = document.querySelector('.display-timer');
  timer.appendChild(p);

  console.log(timeLeft);
  const intervalId = setInterval(() => {
    if (timeLeft) {
      timeLeft--;
      p.innerText = timeLeft;
      console.log(timeLeft);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
