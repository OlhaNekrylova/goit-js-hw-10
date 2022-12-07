import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const ref = {
    input : document.querySelector('#search-box'),
}
const DEBOUNCE_DELAY = 300; 

ref.input.addEventListener('input', _.debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
    evt.preventDefault();
    if (evt.currentTarget.reset()) {
        return;
    }

    fetchCountries(name);
    evt.currentTarget.value.trim();
}