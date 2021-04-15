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

// Hide Loading 
function complete (){
    loading();
    if (!loader.hidden){
        quoteContainer.hidden = false ;
    }
}
//Get Quote From Api 
async function getQuote(){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQute&lang=en&format=jison';

    try{
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        // if Author is blank , add 'Unknow'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknow';
        } else {
           authorText.innerText = data.quoteAuthor; 
        }
      // reduce font size for long quotes
      if(data.quoteText.length >120){
          quoteText.classList.add('long-quote');
      } else {
          quoteText.classList.remove('long-quote');
      }
     quoteText.innerText = data.quoteText;
     //Stope Loader, Show Quote 
     complete();
    } catch(error){
        getQuote();
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
