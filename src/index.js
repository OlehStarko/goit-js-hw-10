import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './fetchCountries';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const singleCountryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
Notify.info('Please start typing the name of any country IN ENGLISH');

function onSearch(e) {
  e.preventDefault();
  fetchCountries()
    .then(countries => {
      renderCountryList(countries);
      if (countries.length > 10) {
        manyCountriesMessage();
      }
      if (countries.length < 2) {
        renderSingleCountry(countries);
      }
    })
    .catch(error => {
      onError(error);
    });
}

function renderCountryList(countries) {
  countryList.innerHTML = '';
  const markup = countries
    .flatMap(
      country =>
        `<p><img src=${country.flags.svg} alt=${country.name.official} height=12 /> ${country.name.official}</p>`
    )
    .join('');

  countryList.innerHTML = markup;
}

function renderSingleCountry(countries) {
  countryList.innerHTML = '';
  const langs = Object.values(countries[0].languages).join(', ');

  const markup = countries
    .flatMap(
      country =>
        `<h2><img src=${country.flags.svg} alt=${country.name.official} height=32 /> ${country.name.official}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Language: ${langs}</p>
       `
    )
    .join('');

  countryList.innerHTML = markup;
}

function manyCountriesMessage() {
  countryList.innerHTML = '';
  Notify.warning('Too many matches found. Please enter a more specific name.');
}

function onError(error) {
  countryList.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}
