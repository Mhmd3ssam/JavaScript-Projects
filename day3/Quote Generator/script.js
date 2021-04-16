const quoteContainer = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


//random quote 
function randomQuote(max){
    let num = Math.random();
    return Math.floor(num* max); 
}

//Get Quote From Api 
const apiUrl = 'https://type.fit/api/quotes';
let quotes = [];

async function boot (){
    const response = await fetch(apiUrl);
    quotes  = await response.json();
    getQuote();
}

function getQuote(){
    const index = randomQuote(quotes.length);
    const quote = quotes[index];
    authorText.innerText = quote.author; 
    quoteText.innerText = quote.text;

}

//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
    
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//fetch data from api and display random quote 
boot();