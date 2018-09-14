'use strict';

const main = () => {
  // - show hide experiments

  const nodes = document.querySelectorAll('article.card h4');

  for (let ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', (event) => {
      const h4 = event.currentTarget;
      const article = h4.parentNode;
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
    const searchTerms = input.value.toLowerCase();
    const results = findStudents(searchTerms);
    displayResults(results);
  };

  const input = document.querySelector('.quick-nav .search input');
  input.addEventListener('keyup', handleChange);

  const searchResults = document.querySelector('.quick-nav .search-results');

  document.body.addEventListener('click', () => {
    searchResults.innerHTML = '';
  });

  input.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  input.addEventListener('focus', handleChange);

  document.addEventListener('keyup', (e) => {
    if (e.keyCode == 27) {
      searchResults.innerHTML = '';
    }
  });

  // - play

  // var playButton = document.querySelector('.game .button');

  // playButton.addEventListener('click', countDown);

  //  countDown(counter) {
  //   playButton.removeEventListener('click', countDown);

  //   var description = document.querySelector('.game .description');
  //   description.innerHTML = "find the easter egg on this page and click it!";

  //   var easterEgg = document.querySelector('section.overview img')
  //   easterEgg.addEventListener('click', function() {
  //     // var displayCountdown = document.querySelector('.game .counter-box');
  //     clickedImage = true;
  //     // displayCountdown.innerHTML = '0';
  //   });

  //   var clickedImage = false;

  //   var counter = 30;
  //   var timeoutId = window.setInterval(timerFunction, 100);

  //   function timerFunction () {
  //     if (clickedImage) {
  //       clearInterval(timeoutId);
  //     } else if (counter >= 0) {
  //       var displayCountdown = document.querySelector('.game .counter-box');
  //       displayCountdown.innerHTML = counter;
  //       counter--;
  //       // console.log(counter);
  //     } else {
  //       clearInterval(timeoutId);
  //     }
  //   }
  // };
};

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
