
import Notiflix from 'notiflix';
import galleryCard from './templates/renderCard.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';


  var lightbox = new SimpleLightbox('.gallery a', {});
const searchQuery = document.querySelector('input[name="searchQuery"]')
const searchForm = document.querySelector('.search-form')
const cardList = document.querySelector('.gallery')
const loadBtn = document.querySelector('.button-load');
const submitBtn = document.querySelector('.button-submit');

let name = searchQuery.value;
let perPage = 40;
let page = 0;

const URL = 'https://pixabay.com/api'
const KEY = '32124506-65f1bceba0e647ef73939c9d6'

  loadBtn.style.display = "none";



// console.log(name.hits)

async function fetchImages(name, page) {

  try {

    const response = await axios.get(
      `${URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
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
  cardList.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
}

function clearAll() {
  while (cardList.firstChild) {
    cardList.firstChild.remove()
    loadBtn.style.display = "block";

}}

async function onSearch(e) {

  e.preventDefault();
  clearAll();  
  name = searchQuery.value;
  fetchImages(name).then(name => {
  if (name.hits.length > 0) {
    Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);

    renderGallery(name);

    
  }
  else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
    )
      clearAll();  
    }  }
  )

}

submitBtn.addEventListener('click', onSearch)

loadBtn.addEventListener(
  'click',
  () => {
    name = searchQuery.value;
    page += 1;

    fetchImages(name, page).then(name => {
let totalPages = Math.ceil(name.totalHits / perPage);
      renderGallery(name);
       if (page >= totalPages) {
        loadBtn.style.display = 'none';

        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
    })
  })

