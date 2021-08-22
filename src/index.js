import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert } from './../node_modules/@pnotify/core/dist/PNotify.js';
import './../node_modules/@pnotify/core/dist/PNotify.css';
import './../node_modules/@pnotify/core/dist/BrightTheme.css';
import './../node_modules/@pnotify/core/dist/Material.css';
import fetchCountries from './fetchCountries.js';
import { oneCountryMarkup, upToTenCountriesList } from './render.js'
import refs from './refs.js'

refs.input.addEventListener('input', debounce(getBackEndData, refs.delay));


function getBackEndData(e) {
  e.preventDefault();
  clearBox();

  const inputValue = refs.input.value;
  // console.log('tempData -->>', inputValue);
  fetchCountries(inputValue)
    .then(data => dataHandler(data))
    .catch(err => console.log('err --->>>', err))

}

function dataHandler(data) {
  // console.log('data :>> ', data);
  const value = data.length;
  if (data.status === 404) {
    alert('Nothing was found by your query. Please repeat more specifically');
  }

  if (value === 1) {
    refs.inputContainer.insertAdjacentHTML('afterend', oneCountryMarkup(data[0]));
  }
  if (value > 1 && value <= 10) {
    refs.inputContainer.insertAdjacentHTML('afterend', upToTenCountriesList(data));
    onLinkClick();
  }
  if (value > 10) {
    alert('Too many matches found. Please enter a more specific query');
  }

}

function clearBox() {
  const isBox = document.querySelector('.country_box');
  if (isBox !== null) {
    document.body.removeChild(document.getElementById("country_box_id"));
  }
  const isList = document.querySelector('.country_container');
  if (isList !== null) {
    document.body.removeChild(document.getElementById("country_list_id"));
  }
}

// function onLinkClick() {
//   var link = document.getElementById("country_link");
//   console.log('link.value :>> ', link.getAttribute("value"));
//   link.onclick = function(e) {
//     return OnClickHandler();
//   }
// }

// function OnClickHandler(e) {
//   console.log('it is here');
//   const tempName = link.value;
//   console.log('tempName :>> ', tempName);
//   dataHandler();
  
// }

// add to refs.js
//<a id="country_link" value="${value.name}" href="">${value.name}</a>