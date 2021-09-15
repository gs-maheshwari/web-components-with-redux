import { setDogData, setCatData } from './redux/actions'
import store from './redux/store';

const RANDOM_DOG_URL = 'https://api.thedogapi.com/v1/images/search';
const RANDOM_CAT_URL = 'https://api.thecatapi.com/v1/images/search';
const DOG_BREEDS = 'https://api.thedogapi.com/v1/breeds';

const fetchDogData = async (url) => {
    const response = await fetch(url);
    const dogData = await response.json();
    store.dispatch(setDogData(dogData));
}

const fetchCatData = async (url) => {
    const response = await fetch(url);
    const catData = await response.json();
    store.dispatch(setCatData(catData));
}

const fetchDogBreeds = async () => {
    const response = await fetch(DOG_BREEDS);
    const breeds = await response.json();
    return breeds;
}


export { fetchDogData, RANDOM_DOG_URL, fetchCatData, RANDOM_CAT_URL, fetchDogBreeds }