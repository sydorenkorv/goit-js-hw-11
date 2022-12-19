import axios from 'axios';
import Notiflix from 'notiflix';
import galleryCard from './templates/renderCard.hbs';

const searchQuery = document.querySelector('input[name="searchQuery"]')
const searchForm = document.querySelector('.search-form')
const cardList = document.querySelector('.gallery')

let name = searchQuery.value;
let page = 0;

const URL = 'https://pixabay.com/api'
const KEY = '32124506-65f1bceba0e647ef73939c9d6'




// console.log(name.hits)

async function fetchImages(name) {

  try {
    const response = await axios.get(
      `${URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
    );

console.log (response.data)
      return response.data;
      
  } catch (error) {
    console.log(error);
    }
}

function renderGallery(name) {
    const renderList = name.hits.map(hit => hit)
    console.log(renderList)
    const markup = galleryCard(renderList);
    cardList.innerHTML = markup;
}

searchQuery.addEventListener('input', () => {
    name = searchQuery.value;
    fetchImages(name).then(name => {

        renderGallery(name)
    })
    
});