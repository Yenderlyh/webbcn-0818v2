'use strict';

const main = (students) => {
  const nodes = document.querySelectorAll('section.experiments h3');

  for (let ix = 0; ix < nodes.length; ix++) {
    nodes[ix].addEventListener('click', event => {
      const h3 = event.currentTarget;
      const div = h3.parentNode;
      const technologies = div.querySelector('.articles');
      technologies.classList.toggle('hidden');
    });
  }

  const findStudents = (terms) => {
    let results = [];
    if (terms) {
      results = students.filter(student => {
        return student.name.toLowerCase().indexOf(terms) >= 0;
      });
    }
    return results;
  };

  const searchResults = document.querySelector('.quick-nav .results');

  const displayResults = results => {
    searchResults.innerHTML = '';

    const ul = document.createElement('ul');

    results.forEach(function (student) {
      const link = document.createElement('a');

      const li = document.createElement('li');

      link.innerText = student.name;
      link.setAttribute('href', student.url);
      li.appendChild(link);
      ul.appendChild(li);
    });
    searchResults.appendChild(ul);
  };

  const handleChange = () => {
    const searchTerms = input.value;
    const results = findStudents(searchTerms);
    displayResults(results);
  };

  const input = document.querySelector('div.searchbox input');
  input.addEventListener('keyup', handleChange);

  document.body.addEventListener('click', () => { searchResults.innerHTML = ''; });

  document.body.addEventListener('keyup', event => {
    event.preventDefault();
    if (event.key === 'Escape') {
      searchResults.innerHTML = '';
    }
  });

  input.addEventListener('click', event => event.stopPropagation());

  input.addEventListener('focus', handleChange);

  //  ---- code counter ---//

  let timeLeft = 30;
  const timer = document.querySelector('.counter');
  const countDown = document.createElement('span');
  countDown.innerText = timeLeft;

  let counertId = setInterval(() => {
    if (timeLeft) {
      timeLeft--;
    } else {
      clearInterval(counertId);
    }
    countDown.innerText = timeLeft;
  }, 3000);

  timer.appendChild(countDown);
};

// var lost = document.createElement('div');
// div.innerHTML = `
//   <main>
//     <div class = "lost">
//       <h2>You've lost!</h3>
//       <img src="https://i.pinimg.com/originals/08/68/ab/0868ab440ea76d859e625d117fd821a0.gif" alt="" width="50%" >
//       <button><a href="diana.html">Meh take me back</a></button>
//       <div>
//   </main>
// `;

// document.body.appendChild(div);

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
