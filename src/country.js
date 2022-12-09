
import { fetchCountries } from './countryService';
import refs from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300; 

refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(evt) {
    evt.preventDefault();
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    const searchQuery = evt.target.value.trim();

    fetchCountries(searchQuery)
    .then(countries => {
        
        if (countries.length === 1) {
            refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
            refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        } else if (countries.length <= 10) {
            refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
        } else if (countries.length > 10) {
            return Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countries.status === 404) {
            return Notify.failure('Oops, there is no country with that name');
        }
    }) 
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

    function renderCountryList(countries) {
    const markup = countries
        .map(({ name, flags }) => {
        return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
                <h2 class="country-list__name">${name.official}</h2>
            </li>
            `
        })
        .join('');
        return markup;
    }

    function renderCountryInfo(countries) {
    const markup = countries
        .map(({ capital, population, languages }) => {
        return `
            <ul class="country-info__list">
                <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
                <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
                <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
            </ul>
            `
        })
        .join('');
        return markup;
    }
