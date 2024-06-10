const formEl = document.querySelector('form');
const searchEl = document.querySelector('#search');
const resultEl = document.querySelector('.result');
const showMoreBtnEl = document.querySelector('#btn-show-more');

let page = 1;

const {VITE_API_URL: apiUrl,VITE_ACCESS_KEY: accessKey} = import.meta.env; //aca recuperar lo del env

async function searchImages(){
  let inputData = searchEl.value || 'random';

  const url = new URL(apiUrl);
  url.searchParams.append("page", page);
  url.searchParams.append("query", inputData);
  url.searchParams.append("client_id", accessKey);

  const response = await fetch(url);
  const {results} = await response.json();

  if(page === 1){
    resultEl.innerHTML = '';
  }

  results.map((result) => {
    const imageWrapper = document.createElement('article');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    resultEl.appendChild(imageWrapper);
  });

  page++;

  if(page > 1){
    showMoreBtnEl.style.display = 'block';
  }

}

searchImages();

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
})

showMoreBtnEl.addEventListener('click', () => searchImages());