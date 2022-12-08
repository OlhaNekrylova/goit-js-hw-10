
import fetchCountries from './countryService';
import refs from './refs';
import articlesOneCountry from './templates/templatesOneCountry.hbs';
import countryList from './templates/templatesManyCountries.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const Handlebars = require("handlebars"); 
// const template = Handlebars.compile("Name: {{name}}");
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300; 

refs.searchForm.addEventListener('input', debounce(countrySearchInputHandler, DEBOUNCE_DELAY));

function countrySearchInputHandler(evt) {
    evt.preventDefault();
    clearArticlesContainer();
    const searchQuery = evt.target.value.trim();

    fetchCountries.fetchCountries(searchQuery)
    .then(data => {
    
    if (data.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.status === 404) {
        return;
    } else if (data.length === 1) {
        buildListMarkup(data, articlesOneCountry);
    } else if (data.length <= 10) {
        buildListMarkup(data, countryList);
    }
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
    }

function buildListMarkup(countries, template) {
    const markup = countries.map(country => template(country)).join('');
    refs.articlesContainer.insertAdjacentHTML('afterbegin', markup);
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}