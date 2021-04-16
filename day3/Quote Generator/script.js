const quoteContainer = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    loader.hidden = true; 
}


//random quote 
function randomQuote(max){
    let num = Math.random();
    return Math.floor(num* max); 
}
// Hide Loading 
function complete (){
    loading();
    if (!loader.hidden){
        quoteContainer.hidden = false ;
    }
}
//Get Quote From Api 
async function getQuote(){
    
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch( apiUrl );
        const quotes = await response.json();
        const index = randomQuote(quotes.length);
        const quote = quotes[index]; 

        // display quote 
        authorText.innerText = quote.author; 
        
      // reduce font size for long quotes
      if(quote.text.length >120){
          quoteText.classList.add('long-quote');
      } else {
          quoteText.classList.remove('long-quote');
      }
     quoteText.innerText = quote.text;
     //Stope Loader, Show Quote 
     complete();
    } catch(error){
        console.error(error);
    }

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
//On load 
getQuote();
