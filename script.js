$(function() {

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

$('#country-name').val('');

$('#search')
    .click(searchCountries)
    .prop('disabled', true)

$('#country-name')
    .keyup(function(event){
        if(event.keyCode == 13){
            $("#search").click();
        }
    });

$(function() {
    $('#country-name').keyup(function () {
        if ($(this).val().length < 3) {
            $('#search')
                .prop('disabled', true)
        } else {
           $('#search').prop('disabled', false);
        }
    });
});
  
function searchCountries() {
    var countryName = $('#country-name').val();
    countriesList.empty();

    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList,
        timeout: 1000,
        error: function(){
            $('#header').text('No match was found, try again!');
        }
    });
 

}

function showCountriesList(response) {
    
    response.forEach(function(current) {
        var header = $('#header').text('Lista krajów'); 
        var flag = $('<img>').attr('src', 'http://www.geonames.org/flags/m/' + current.alpha2Code.toLowerCase() + '.png').appendTo($('<div class="collapsible-header">'))
        var country = $('<li>')
            .append($('<div class="collapsible-header">')
            .append(flag)
            .text(current.name))  
            .appendTo(countriesList)
            .click(function() {($(this).find('.details')).toggle() });
       

        var details = $('<div class="collapsible-body details">')
            .append($('<img>')
                .attr('src', 'http://www.geonames.org/flags/x/' + current.alpha2Code.toLowerCase() + '.gif'))
            .append($('<p>')
                .html('<b>Capital: </b>' + current.capital))
            .append($('<p>')
                .html('<b>Region: </b>' + current.region))
            
            .append($('<p>')
                .html('<b>Subregion: </b>' + current.subregion))
            .append($('<p>')
                .html('<b>Population: </b>' + current.population))

            .appendTo(country); 
            
    if(response.length === 1) {
        details.show(); 
        header.hide();
    }
    
    }); 
}

});