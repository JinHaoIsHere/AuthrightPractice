var quoteButton = document.querySelector('.new-quote');
var endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

var getQuote = ()=>{
    fetch(endpoint).then(function(response){
        
        return response.json();
        console.log(response.json());
    })
    .then(function(data){
        //console.log(data.message);
        var message = data.message;
        document.querySelector('.quote-text').textContent=message;
    })
    .catch(function(){
        console.log("error");
    })
}
quoteButton.addEventListener('click',getQuote);
getQuote();