import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const ref = {
    input : document.querySelector('#search-box'),
}
const DEBOUNCE_DELAY = 300; 

ref.input.addEventListener('input', _.debounce(onInputChange, DEBOUNCE_DELAY));

const countries = [];

function onInputChange(evt) {
    evt.preventDefault();
    if (evt.currentTarget.reset()) {
        return;
    }

    fetchCountries(name);
    evt.currentTarget.value.trim();

    if (countries.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (2 <= countries.length <= 10) {
        return countries.map();
    } else {
        return countriesCardMarkup();        

    }
}

function countriesCardMarkup() {

}