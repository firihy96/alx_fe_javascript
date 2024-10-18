let quotes = [
  {
    text: "Everything you can imagine is real.",
    category: "cat-0",
  },
  {
    text: "Never regret anything that made you smile.",
    category: "cat-1",
  },
  {
    text: "The manifesto of the dealmaker is simple: Reality is negotiable.",
    category: "cat-2",
  },
  {
    text: "Every moment is a fresh beginning.",
    category: "cat-3",
  },
];
function randomIntFromInterval(arrLength) {
  // min and max included
  return Math.floor(Math.random() * arrLength);
}
// DOM elements selection
let quoteDisplay = document.getElementById("quoteDisplay"),
  newQuoteBtn = document.getElementById("newQuote"),
  newQuoteText = document.getElementById("newQuoteText"),
  newQuoteCategory = document.getElementById("newQuoteCategory");
addQuoteBtn = document.querySelector("#newQuoteCategory + button");
// selecting random quote
function showRandomQuote() {
  let randomQuoteIndex = randomIntFromInterval(quotes.length);
  let randomQuote = quotes[randomQuoteIndex].text,
    randomQuoteCat = quotes[randomQuoteIndex].category;

  quoteDisplay.innerHTML = "<q>" + randomQuote + "</q>";
}
function createAddQuoteForm() {
  if (!newQuoteText.value || !newQuoteCategory.value) {
    addQuoteBtn.innerText = "Please, Enter quote";
  } else {
    addQuoteBtn.innerText = "Add Quote";
    quotes.push({ text: newQuoteText.value, category: newQuoteCategory.value });
		newQuoteText.value ='';
		newQuoteCategory.value='';
  }
}
// After parsing html
document.addEventListener("DOMContentLoaded", () => {
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", createAddQuoteForm);
});
// onclick="addQuote()"