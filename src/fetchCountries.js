const countryListRef = document.querySelector(".country-list");
const countryInfoRef = document.querySelector(".country-info");
const headStyleRef = document.querySelector("style");

export default function fetchCountries(evt) {
    const searchRequestByCountryName = evt.target.value;
        
fetch(`
    https://restcountries.com/v3.1/name/${searchRequestByCountryName}
    ?fields=name,capital,population,flags,languages`
).then(response => response.json())
.then(data => {
    console.log(data);

    if (data.length === 1){
      return outputOneCountry(data);
    }
    
    outputListOfCountries(data); 
})
.catch(error => console.log(error))
};

function outputListOfCountries(data){
    // if(!data) {return};
  const markup = data.map(country => `
  <li class="country-item">
    <img src=${country.flags.svg} alt="" width="20px">
    <span>${country.name.common}</span>
  </li> 
  `).join("");
  
  const styles = `
        .country-list {
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 15px;
          padding-inline-start: 0;
        }
        .country-item {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          outline: 1px, solid, red;
        }
        .country-item:not(:last-child) {
          margin-bottom: 10px;
        }
        .country-list img {
          margin-right: 5px;
        }
        `;

      countryInfoRef.innerHTML = "";
      countryListRef.innerHTML = markup;
      headStyleRef.innerHTML = styles; 
};

function outputOneCountry(data){
    if(!data){return};
    
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
    const styles = `
      .country-name {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bold;
}
.country-name img {
  margin-right: 10px;
}
.country-props {
list-style: none;
margin: 0;
padding: 0;
}
.country-props li {
margin-top: 10px;
}
     `;

    countryListRef.innerHTML = "";
    countryInfoRef.innerHTML = markup;
    headStyleRef.innerHTML = styles;
}

