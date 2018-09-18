'use strict';

const nodes = document.querySelectorAll('article.card h4');

const main = (students) => {
  for (let ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', (event) => {
      const h4 = event.currentTarget;
      const article = h4.parentNode;
      article.classList.toggle('is-expanded');
      const content = article.querySelector('.content');
      const expandArrow = article.querySelector('.expand');
      const collapseArrow = article.querySelector('.collapse');
      content.classList.toggle('hide');
      expandArrow.classList.toggle('hide');
      collapseArrow.classList.toggle('hide');
    });
  };

  // - student search

  const findStudents = (terms) => {
    let results = [];

    if (terms) {
      results = students.filter((student) => {
        return student.name.toLowerCase().indexOf(terms) >= 0;
      });
    };
    return results;
  };

  const displayResults = (results) => {
    event.stopPropagation();
    if (!results.length) {
      return;
    };

    const ul = document.createElement('ul');
    results.forEach((student) => {
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
    searchResults.innerHTML = '';

    displayResults(results);
  };

  // const searchResults = document.querySelector('.quick-nav .search-results');
  // searchResults.innerHTML = '';

  const input = document.querySelector('.quick-nav .search input');
  input.addEventListener('keyup', handleChange);

  const searchResults = document.querySelector('.quick-nav .search-results');
  document.body.addEventListener('click', () => {
    searchResults.innerHTML = '';
  });

  input.addEventListener('click', (event) => {
    return event.stopPropagation(event);
  });
  input.addEventListener('focus', handleChange);

  document.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
      searchResults.innerHTML = '';
    }
  });

  input.addEventListener('click', event => event.stopPropagation(event));
  input.addEventListener('focus', handleChange);

  // Game

  const question = 'Do you want to play? You have to guess my favorite interest in 10 seconds, and you have only one chance! Good luck!';
  let intervalId;
  if (window.confirm(question)) {
    // ---- margin for student quick jump

    const addMargin = document.querySelector('.sub-header');
    addMargin.classList.add('add-margin');

    // ---- timer starts

    const timer = document.querySelector('.timer');

    const spanTimer = document.createElement('span');

    let timeLeft = 10;
    spanTimer.innerText = timeLeft;

    console.log(timeLeft);
    intervalId = setInterval(() => {
      if (timeLeft) {
        timeLeft--;
        console.log(timeLeft);
      } else {
        clearInterval(intervalId);
        location.href = 'https://i.giphy.com/media/Ix5Pk3cUofTLW/giphy.webp';
      }
      spanTimer.innerText = timeLeft;
    }, 1000);

    timer.appendChild(spanTimer);
  }

  // ---- game answers

  const wrongAnswer = document.querySelectorAll('.wrong-answer');
  for (let ix = 0; ix < wrongAnswer.length; ix++) {
    wrongAnswer[ix].addEventListener('click', () => {
      clearInterval(intervalId);
      window.confirm('Try again');
      window.location.href = 'https://i.giphy.com/media/Ix5Pk3cUofTLW/giphy.webp';
    });
  }

  const rightAnswer = document.querySelector('.right-answer');
  rightAnswer.addEventListener('click', () => {
    clearInterval(intervalId);
    window.confirm('Amazing, you are right!!');
    window.location.href = 'https://i.giphy.com/media/3oFzmkkwfOGlzZ0gxi/giphy.webp';
  });
};

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
