// Define variable to hold the value of the array in the global scope
var makeRandomQuotes = 0;
// Assign quotes to an array of objects
var quotes = [
	
			{ 	quote: 		"Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinkin' badges!",
				source: 	"Alfonso Bedoya",
				citation:   "The Treasure of the Sierra Madre",
				year: 		1948,
				tag:        "Movie: Action"   
			},
			{ 	quote: 		"All the world's a stage, and all the men and women merely players.",
				source: 	"William Shakespeare",
				citation:   "As You Like It",
				tag:        "Shakespeare"      
			},
			{ 	quote: 		"The worst loneliness is not to be comfortable with yourself.",
				source: 	"Mark Twain",
				tag:		"Famous Author"  
			},
			{ 	quote: 		"Success is not final; failure is not fatal: It is the courage to continue that counts.",
				source: 	"Winston S. Churchill",
  				tag:		"Famous Politician"   
			},
			{ 	quote: 		"That's what I love most about writers--they're such lousy actors.",
				source: 	"Vincent H. O'Neil",
				citation:   "Death Troupe",
				tag:        "Actors"   
			},
			{ 	quote: 		"Life moves pretty fast. You don't stop and look around once in a while, you could miss it.",
				source: 	"Matthew Broderick",
				citation:   "Ferris Bueller",
				year: 		1986,
				tag:        "Movie: Comedy"   
			}
];


// Anonymous function used to make random quote from the quotes object.
function getRandomQuote() {
// Using the Math.random Method to generate the random numbers in the quotes array length 0 to 5.
	makeRandomQuotes = Math.floor( Math.random() * quotes.length );
// Assign the global variable and get the number that's generated and the object that's assigned to that number.
	var makeQuote = quotes[makeRandomQuotes];
	
	return makeQuote;	
}
// A self contain color changer function when called.
function bgColor() {
// Array to contain color names that the browser can recognize.
	var colors = [ 'maroon','blue', 'orange', 'teal', 'gray', 'purple' ];
// Get randon color from the array.
	var getRandomColor = Math.floor( Math.random() * colors.length );
// Assign a local variable to make color.
	var makeColor = colors[getRandomColor];
// Returns make color to body tag of the html.
	return document.body.style.backgroundColor = makeColor;
} 

function printQuote() { 
// Assign local variable that getRandomQuote() function when its called.
	var printMakeQuote = getRandomQuote();
// Assign local variable that getRandomColor() function when its called.
	var bgRandomColor = bgColor();
// If there is a citation property on the quotes property it will display this variable.
	var getCitation = isThereCitation(printMakeQuote.citation);
// If there is a year property with a year, it will display this variable.
	var getYear = isThereYear(printMakeQuote.year);

	var getTags = getTagQuotes(printMakeQuote.tag);
// Anonymous function to be used if object propery year is in the quote.
	function isThereYear(objectProp) {	
		if ( objectProp !== undefined ) {		
			return '<span class="year">' + objectProp + '</span>';			
		} else {
			return '';
		}		
	}
// Anonymous fuction to be used if object propery citation is in the quote.
	function isThereCitation(objectProp) {	
		if ( objectProp !== undefined ) {
			return '<span class="citation">' + objectProp + '</span>';			
		} else {
			return '';
		}		
	}
// Anonymous function used if tag propery is in the object. An h2 tag displays in the Div tag with quote-box tag.
	function getTagQuotes(objectProp) {
		if ( objectProp !== undefined ) {
			return '<h2>' + objectProp + '</2>';
		} else {
			return '';
		}
		
	}

 
// Return this code to the .addEventListener when the button is clicked
	document.getElementById('quote-box').innerHTML = getTags + '<p class="quote">' + printMakeQuote.quote + '</p>'
    + '<p class="source">' + printMakeQuote.source + getCitation + getYear + '</p>';	

};


// when user clicks anywhere on the button, the "printQuote" function is called
 document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Add setInterval to display different quote and background color every 10 sec.
 setInterval(printQuote, 10000);




