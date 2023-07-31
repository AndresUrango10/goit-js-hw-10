import axios from 'axios';
import Notiflix from 'notiflix';

const apiKey =
  'live_YTJ1RvS7SptZLxgfgqxkM4PDJ7TTgFoHYiDhRh8pWxzu4G9BuqJtBRHxsSENcdNd';

axios.defaults.headers.common['x-api-key'] = apiKey;

const loader = document.querySelector('.loader');
const loaderParagraph = document.querySelector('.loader-paragraph');
const errorParagraph = document.querySelector('.error-paragraph');

// Función para hacer la petición HTTP de la lista de razas
async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    // console.log(response.data);
    return response;
  } catch (error) {
    // Si hay un error en la petición, ocultamos el loader y el párrafo de carga
    loader.style.display = 'none';
    loaderParagraph.style.display = 'none';
    // Mostramos una notificación de advertencia para informar al usuario sobre el error
    Notiflix.Notify.warning('Error al cargar la lista de razas');
    // Mostramos el párrafo de error para indicar al usuario que ha ocurrido un problema
    errorParagraph.style.display = 'block';
  }
}

// Función para hacer la petición HTTP de la información del gato por su raza
async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    // console.log('Datos del gato por su raza:', response.data);
    return response;
  } catch (error) {
    // Si hay un error en la petición, ocultamos el loader y el párrafo de carga
    loader.style.display = 'none';
    loaderParagraph.style.display = 'none';
    // Mostramos el párrafo de error para indicar al usuario que ha ocurrido un problema
    Notiflix.Notify.warning(
      'Error al cargar la lista de razas Por favor, selecciona otra raza.'
    );
    errorParagraph.style.display = 'block';
  }
}

export { fetchBreeds, fetchCatByBreed };
