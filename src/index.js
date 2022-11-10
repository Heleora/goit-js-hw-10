import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector("#search-box");
const name = inputRef.elements.name.value;
console.log(name);

inputRef.addEventListener("input", fetchCountries);

function fetchCountries(name) {
fetch(`
    https://restcountries.com/v3.1/name/{name}`
)
}