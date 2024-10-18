let quotes = [
  {
    quote: "Everything you can imagine is real.",
    category: "cat-0",
  },
  {
    quote: "Never regret anything that made you smile.",
    category: "cat-1",
  },
  {
    quote: "The manifesto of the dealmaker is simple: Reality is negotiable.",
    category: "cat-2",
  },
  {
    quote: "Every moment is a fresh beginning.",
    category: "cat-3",
  },
];
function randomIntFromInterval(arrLength) {
  // min and max included
  return Math.floor(Math.random() * arrLength);
}
// DOM elements selection
let quoteDisplay = document.getElementById("quoteDisplay"),
  newQuoteBtn = document.getElementById("newQuote");

// triggering new quote
newQuoteBtn.addEventListener('click', ()=>{
	let randomQuoteIndex = randomIntFromInterval(quotes.length);
	let randomQuote = quotes[randomQuoteIndex].quote,
	randomQuoteCat = quotes[randomQuoteIndex].category;

	quoteDisplay.textContent = randomQuote;
})
// After parsing html 
document.addEventListener("DOMContentLoaded", () => {

});
