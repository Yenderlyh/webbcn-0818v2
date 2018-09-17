'use strict';

const buildDom = html => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
};

const main = (students) => {
  // -----EXPERIMENTS----//

  const nodes1 = document.querySelectorAll('.list-articles h4');
  for (let ix = 0; ix < nodes1.length; ix++) {
    nodes1[ix].addEventListener('click', event => {
      const h4 = event.currentTarget;
      const article = h4.parentNode;
      const content = article.querySelector('div');
      content.classList.toggle('hide');
    });
  };

  // -----BUTTON-----//

  const mainButton = document.querySelector('.site-nav .button');
  mainButton.addEventListener('mouseover', event => event.target.classList.toggle('button-inverted'));
  mainButton.addEventListener('mouseout', event => event.target.classList.toggle('button-inverted'));

  const secondaryButton = document.querySelectorAll('.list-articles a');
  for (let ix = 0; ix < secondaryButton.length; ix++) {
    secondaryButton[ix].addEventListener('mouseover', event => event.target.classList.toggle('button-inverted'));
    secondaryButton[ix].addEventListener('mouseout', event => event.target.classList.toggle('button-inverted'));
  };

  // ----DROP DOWN MENU----//

  const findStudents = term => {
    let results = [];
    if (term) {
      results = students.filter(item => {
        const name = item.name.toUpperCase();
        if (name.indexOf(term) !== -1) { return true; }
      });
    };
    return results;
  };

  const displayResults = results => {
    searchResult.innerHTML = '';
    const ul = document.createElement('ul');
    results.forEach(student => {
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
  document.body.addEventListener('click', () => { searchResult.innerHTML = ''; });

  document.querySelector('.input-student input').addEventListener('click', event => event.stopPropagation(event));

  document.body.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') { searchResult.innerHTML = ''; }
  });

  document.querySelector('.input-student input').addEventListener('focus', handleChange);

  // -----TIMER-----//

  let time = 30;
  const p = document.createElement('p');
  p.classList.add('button');
  p.classList.add('timer');
  p.innerText = time;
  document.querySelector('.input-student').appendChild(p);
  const timerId = setInterval(() => {
    time--;
    if (time === 0) { clearInterval(timerId); }
    p.innerText = time;
  }, 1000);

  p.addEventListener('click', () => clearInterval(timerId));
}; // End of main()

window.addEventListener('load', () => {
  window.fetch('/api/students')
    .then(result => result.json())
    .then(main)
    .catch(error => console.log(error));
});
