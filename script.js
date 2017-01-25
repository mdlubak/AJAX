$(function() {

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');


$('#search').click(searchCountries);
$('#search').prop('disabled', true);
$('#country-name').val('');

$(function() {
    $(document).tooltip;
  });

$(function() {
    $('#country-name').keyup(function () {
        if ($(this).val().length < 3) {
            $('#search').prop('disabled', true);
        } else {
           $('#search').prop('disabled', false);
        }
    });
});
  
function searchCountries() {
    var countryName = $('#country-name').val();
    countriesList.empty();
    //if(!countryName.length) {
      //  countryName = 'Poland';
    //}

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
        
        var country = $('<li class="country">')
            .text(current.name)
            .appendTo(countriesList)
            .click(function() { ($(this).find('.details')).toggle() });
        
        var details = $('<ul class="details">')
            .append($('<li>').text('Population: ' + current.population))
            .append($('<li>').text('Population: ' + current.population))
            .append($('<li>').text('Population: ' + current.population))
            .appendTo(country); 
            //.hide();

        var oneCountry = response.length === 1 ? (details.show(), header.text(current.name)) : details.hide();
    }); 
}

});