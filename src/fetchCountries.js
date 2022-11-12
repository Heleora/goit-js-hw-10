import Notiflix from 'notiflix';

const countryListRef = document.querySelector(".country-list");
const countryInfoRef = document.querySelector(".country-info");

export default function fetchCountries(evt) {
  const searchRequestByCountryName = evt.target.value.trim();
  console.log(searchRequestByCountryName);

  if (searchRequestByCountryName === "") {
      clearMarkup();
      return;
  };
  
  fetch(`
  https://restcountries.com/v3.1/name/${searchRequestByCountryName}?fields=name,capital,population,flags,languages`)
  .then(response => {
    if(!response.ok) {
      throw new Error (response.status);
    }
    return response.json()
  })
  .then(data => {
  console.log(data);

  if (data.length > 10) {
      clearMarkup();
      return Notiflix.Notify.info(
          "Too many matches found. Please enter a more specific name.");
  }

  if (data.length === 1){
      return outputOneCountry(data);
  }
  
  outputListOfCountries(data);    
})
.catch(() => {
  clearMarkup();  
  Notiflix.Notify.failure("Oops, there is no country with that name");
})
};
        
function outputListOfCountries(data){
  const markup = data.map(country => `
  <li class="country-item">
    <img src=${country.flags.svg} alt="" width="20px">
    <span>${country.name.common}</span>
  </li> 
  `).join("");
  
      countryInfoRef.innerHTML = "";
      countryListRef.innerHTML = markup; 
};

function outputOneCountry(data){
  const country = data[0];
  const languages = Object.values(country.languages).join(", ");

    const markup = `
    <p class="country-name">
        <img src=${country.flags.svg} alt="" width="25px">
      ${country.name.common}
      </p> 
      <ul class="country-props">
        <li><b>Capital: </b>${country.capital}</li>
        <li><b>Population: </b>${country.population}</li>
        <li><b>Languages: </b>${languages}</li>
      </ul>
    `;
    
    countryListRef.innerHTML = "";
    countryInfoRef.innerHTML = markup;
    };

function clearMarkup() {
  countryInfoRef.innerHTML = "";
  countryListRef.innerHTML = ""; 
};