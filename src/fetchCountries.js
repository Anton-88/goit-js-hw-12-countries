const fetchCountries = function (countryName) {
    const source = 'https://restcountries.eu/rest/v2/name/'
    let searchQuery = `${source}${countryName}`
     return fetch(searchQuery)
       .then(res => res.json() )
    .catch(err => console.log(err))
   ;
  
}
  
export default fetchCountries