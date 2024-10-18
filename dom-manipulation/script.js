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
// selecting random quote
function showRandomQuote() {
	quotes = [...JSON.parse(window.localStorage.getItem('quotes'))]
  let randomQuoteIndex = randomIntFromInterval(quotes.length);
  let randomQuote = quotes[randomQuoteIndex].text,
    randomQuoteCat = quotes[randomQuoteIndex].category;
  quoteDisplay.innerHTML = "<q>" + randomQuote + "</q>";
}
// create quote adding form
let quoteFormDiv = document.createElement("div"),
	userInputQuoteText = document.createElement("input"),
	userInputQuoteCategory = document.createElement("input"),
	addQuoteBtn = document.createElement("button");
	addQuoteBtn.textContent = 'Add Quote';
function createAddQuoteForm() {
  // adding attributes
  userInputQuoteText.setAttribute("id", "newQuoteText");
  userInputQuoteText.setAttribute("type", "text");
  userInputQuoteText.setAttribute("placeholder", "Enter a new quote");
  userInputQuoteCategory.setAttribute("id", "newQuoteCategory");
  userInputQuoteCategory.setAttribute("type", "text");
  userInputQuoteCategory.setAttribute("placeholder", "Enter quote category");
  addQuoteBtn.setAttribute("onClick", addQuote);
	//structuring
	quoteFormDiv.appendChild(userInputQuoteText);
	quoteFormDiv.appendChild(userInputQuoteCategory);
	quoteFormDiv.appendChild(addQuoteBtn)
	document.querySelector('body').appendChild(quoteFormDiv)
}


function addQuote() {
  if (!userInputQuoteText.value || !userInputQuoteCategory.value) {
    addQuoteBtn.innerText = "Please, Enter quote";
  } else {
    addQuoteBtn.innerText = "Add Quote";
    quotes.push({ text: userInputQuoteText.value, category: userInputQuoteCategory.value });
		// update localStorage 
		window.localStorage.setItem('quotes', JSON.stringify([...quotes]))
    userInputQuoteText.value = "";
    userInputQuoteCategory.value = "";
  }
}
// After parsing html
document.addEventListener("DOMContentLoaded", () => {
  newQuoteBtn.addEventListener("click", showRandomQuote);
	createAddQuoteForm()
  addQuoteBtn.addEventListener("click", addQuote);
});
