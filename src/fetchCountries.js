const BASIC_URL = 'https://restcountries.com/v3.1';
const input = document.querySelector('#search-box');

export default function fetchCountries() {
  return fetch(
    `${BASIC_URL}/name/${input.value.trim()}?fields=name,capital,flags,population,languages`
  ).then(response => {
    return response.json();
  });
}
