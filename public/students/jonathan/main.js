'use strict';

const main = (students) => {
  const navButton = document.getElementById('nav-button');

  navButton.addEventListener('click', (event) => {
    const h3 = event.currentTarget;
    const nav = h3.parentNode;
    nav.classList.toggle('hidden');
  });

  const nodes = document.querySelectorAll('article.card h3');

  for (let ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', (event) => {
      const h3 = event.currentTarget;
      const article = h3.parentNode;
      article.classList.toggle('hidden');
    });
  };

  const findStudents = (terms) => {
    let results = [];

    if (terms) {
      results = students.filter(item => {
        if (item.name.toLowerCase().indexOf(terms) !== -1) {
          return true;
        }; if (item.name.indexOf(terms) !== -1) {
          return true;
        };
        return false;
      });
    };
    return results;
  };

  const displayResults = (results) => {
    const searchResults = document.querySelector('.quick-nav .search-results');
    searchResults.innerHTML = '';

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
    let searchTerms = input.value;
    let results = findStudents(searchTerms);
    displayResults(results);

    const searchResults = document.querySelector('.quick-nav .search-results');
    document.body.addEventListener('click', () => {
      return searchResults.innerHTML = '';
    });

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        searchResults.innerHTML = '';
      }
    });

    input.addEventListener('click', (event) => event.stopPropagation());

    input.addEventListener('focus', handleChange);

    console.log(results);
  };

  const input = document.querySelector('#quick-jump');

  input.addEventListener('keyup', handleChange);

  // ----------------------------------------
  // ----------- GAME COUNTDOWN -------------
  // ----------------------------------------

  // function countDown(i) {
  //   var int = setInterval(function () {
  //       console.log(i);
  //       document.querySelector('.game .counter-box').innerHTML = i;
  //       i-- || clearInterval(int);  //if i is 0, then stop the interval
  //   }, 1000);
  // }
  // countDown(30);

  const playButton = document.querySelector('.game .button');

  const countDown = () => {
    playButton.removeEventListener('click', countDown);

    const description = document.querySelector('.game .description');
    description.innerHTML = 'find the easter egg on this page and click it!';

    const easterEgg = document.querySelector('section.overview img');
    easterEgg.addEventListener('click', () => clickedImage = true);

    let clickedImage = false;

    let counter = 30;
    const timeoutId = window.setInterval(() => {
      if (clickedImage) {
        clearInterval(timeoutId);
      } else if (counter >= 0) {
        const displayCountdown = document.querySelector('.game .counter-box');
        displayCountdown.innerHTML = counter;
        counter--;
      } else {
        clearInterval(timeoutId);
      };
    }, 100);
  };

  playButton.addEventListener('click', countDown);
};

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
