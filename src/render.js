export let oneCountryMarkup = ({ name, capital, population, languages, flag }) => {
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
  
export let upToTenCountriesList = (obj) => {
    return `<div class="country_container">
                  <ul class="countries_list"> 
                   ${obj.map(value => `<li class="country_list_item">${value.name}</li>`).join(" ")}
                 </ul>
                 <input type="button" value="Remove" id="rmvListBtn" onclick="document.body.removeChild(this.parentNode)">
                 </div>`
  }