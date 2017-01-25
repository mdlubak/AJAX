
$(function() {

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?";

$('.trigger').click(function() {
	getQuote();
})

function getQuote() {
	$.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
	var tweetText = 'Quote of the day - ' + input.quoteText + ' Author: ' + input.quoteAuthor;

	if (!input.quoteAuthor) {
		input.quoteAuthor = 'Unknown author';
	}
	
	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text('"' + input.quoteText + '"');
		$('.author').text('Author: ' + input.quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
}

getQuote();
	
});
