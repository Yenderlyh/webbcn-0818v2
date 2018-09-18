const main = (students) => {
  const titles = document.querySelectorAll('article.interest h3');

  for (let ix = 0; ix < titles.length; ix++) {
    titles[ix].addEventListener('click', (event) => {
      const h3 = event.currentTarget;
      const articleElement = h3.parentNode;
      const wrap = articleElement.querySelector('.wrap');
      wrap.classList.toggle('hide');
    });
  }

  /// /////////Button//////////////

  const secondaryButton = document.querySelectorAll('.list-articles a');

  for (let ix = 0; ix < secondaryButton.length; ix++) {
    secondaryButton[ix].addEventListener('mouseover', (event) => {
      event.target.classList.toggle('button-inverted');
    });
    secondaryButton[ix].addEventListener('mouseout', (event) => {
      event.target.classList.toggle('button-inverted');
    });
  }

  /// ///////////searchBar//////////////

  const findStudents = (term) => {
    let results = [];
    if (term) {
      results = students.filter((student) => student.name.toUpperCase().indexOf(term) >= 0);
    }
    return results;
  };

  const displayResults = (results) => {
    searchResult.innerHTML = '';
    const ul = document.createElement('ul');
    results.forEach(function (student) {
      const link = document.createElement('a');
      link.innerText = student.name;
      link.setAttribute('href', student.url);
      const li = document.createElement('li');
      li.appendChild(link);
      ul.appendChild(li);
    });
    searchResult.appendChild(ul);
  };

  const handleChange = () => {
    const searchTerms = input.value.toUpperCase();
    const results = findStudents(searchTerms);
    displayResults(results);
  };

  const input = document.querySelector('.input-student input');
  input.addEventListener('keyup', handleChange);

  const searchResult = document.querySelector('.search-results');
  document.body.addEventListener('click', () => {
    searchResult.innerHTML = '';
  });

  document.querySelector('.input-student input').addEventListener('click', (event) => {
    event.stopPropagation(event);
  });

  document.body.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      searchResult.innerHTML = '';
    }
  });

  document.querySelector('.input-student input').addEventListener('focus', handleChange);

  // timer

  const timer = document.querySelector('section.about div.timer');
  let timeLeft = 60;
  const interval = setInterval(() => {
    if (timeLeft) {
      timeLeft--;
      timer.innerText = timeLeft;
    } else {
      clearInterval(interval);
    }
  }, 1000);

  timer.addEventListener('click', () => {
    clearInterval(interval);
  });
};// End of the main function

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
