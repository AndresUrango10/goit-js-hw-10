// Solución para index.js
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.getElementById('select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const loaderParagraph = document.querySelector('.loader-paragraph');

// Función para obtener y mostrar las razas de gatos disponibles en un menú desplegable
async function fetchCats() {
  const cats = await fetchBreeds();

  let data = cats.data.map(value => {
    return { text: value.name, value: value.id };
  });

  new SlimSelect({
    select: '#select',
    data: data,
  });
}

fetchCats();

// Función que se activa cuando se cambia la selección en el menú desplegable
async function catChange(event) {
  // Ocultar el contenedor de información del gato actual
  catInfo.style.display = 'none';
  // Mostrar el loader mientras se carga la nueva información
  loader.style.display = 'block';
  loaderParagraph.style.display = 'block';

  const api = await fetchCatByBreed(event.target.value);
  // console.log('Respuesta de fetchCatByBreed:', api);
  let markup = api.data
    .map(
      value => `
  <img class="cat-info__cat-image lazyload blur-up" src="${value.url}" value-src="${value.url}" alt="Generic alt" width="400px" height="300px">
  <div class="cat-description">
  <h2 class="cat-description__cat-breed">${value.breeds[0].name}</h2>
  <p class="cat-description__cat-temperament">${value.breeds[0].description}</p>
  <h3 class="cat-description__cat-temperament">Temperament</h3>
  <p class="cat-description__cat-temperament">${value.breeds[0].temperament}</p>
  </div>`
    )
    .join(' ');
  // Mostrar la información del nuevo gato y ocultar el loader
  catInfo.innerHTML = markup;
  catInfo.style.display = 'block';
  loader.style.display = 'none';
  loaderParagraph.style.display = 'none';
}
select.addEventListener('change', catChange);
