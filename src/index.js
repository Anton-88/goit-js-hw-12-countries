import './sass/main.scss';
import debounce from 'lodash.debounce';
import {alert} from './../node_modules/@pnotify/core/dist/PNotify.js';


const refs = {
  input: document.querySelector('#input'),
  inputContainer: document.querySelector('.input_container'),
  countryBox: document.querySelector('.conutry_box'),
  countryList: document.querySelector('.country_list'),
  moreInfoBtn: document.querySelector('#addBtn'),

  delay: 500,
}


function getBackEndData(e) {
  e.preventDefault();
  const inputValue = refs.input.value;
  console.log('tempData -->>', inputValue);
  fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`)
    .then(response => response.json())
    .then(data => dataHandler(data))
    .catch(err => console.log('err --->>>', err))

}

function dataHandler(data) {
  console.log('data :>> ', data);
  const value = data.length;
  if(data.status === 404) {
    alert('Nothing was found by your query. Please repeat more specifically');
  }

  if (value === 1) {
    refs.inputContainer.insertAdjacentHTML('afterend', oneCountryMarkup(data[0]));
  }
  if (value > 1 && value <= 10) {
    refs.inputContainer.insertAdjacentHTML('afterend', upToTenCountriesList(data));
  }
  if (value > 10) {
    alert('Too many matches found. Please enter a more specific query');
  }

}

const oneCountryMarkup = ({ name, capital, population, languages, flag }) => {
  //added this check because if you type Macao, for ex, there is no info about its capital
  capital = capital.length > 1 ? capital : 'no data';
  
  return `<div class="conutry_box" id='country_box_id'>
            <h2 class="country_name">${name}</h2>
            <div class="country_info">
              <div class="country_info_left">
              <div class="capital_info">
                <p class="capital">Capital: <p class="capital_value">${capital}</p>
              </div>
              <div class="population_info">
                <p class="population">Population: <p class="population_value">${population}</p>
              </div>
              <ul class="languages_list">Languages: 
                ${languages.map(value => `<li class="language">${value.name}</li>`).join(" ")}
              </ul>
            </div>
            <div class="country_info_right">
              <img src="${flag}" alt="${name}" class="flag">
              </div>
            </div>
            <input type="button" value="Remove" id="rmvBtn" onclick="document.body.removeChild(this.parentNode)">
          </div>`
}

const upToTenCountriesList = (obj) => {
  return`<div class="country_container">
                <ul class="countries_list"> 
                 ${obj.map(value => `<li class="country_list_item">${value.name}</li>`).join(" ")}
               </ul>
               <input type="button" value="Remove" id="rmvListBtn" onclick="document.body.removeChild(this.parentNode)">
               </div>`
}


// const debounceHandle = debounce(getBackEndData, refs.delay);
refs.input.addEventListener('input', debounce(getBackEndData, refs.delay));