$(function() {

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
    var countryName = $('#country-name').val();
    
    if(!countryName.length) countryName = 'Poland';

    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    });
}
    
function showCountriesList(resp) {
    var row;

    countriesList.empty();
    
    resp.forEach(function(item) {
        row = $('<li>').text(item.name);
        $('<p>').text('Capital: ' + item.capital).appendTo(row);
        $('<p>').text('Population: ' + item.population).appendTo(row);
        
        row.appendTo(countriesList);
    });
}
    
});