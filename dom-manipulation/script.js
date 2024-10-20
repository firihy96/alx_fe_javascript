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
    text: "555555",
    category: "cat-1",
  },
  {
    text: "The manifesto of the dealmaker is simple: Reality is negotiable.",
    category: "cat-2",
  },
  {
    text: "Every moment is a fresh beginning.",
    category: "cat-3",
  }
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
  quotes = [...JSON.parse(window.localStorage.getItem("quotes"))];
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
addQuoteBtn.textContent = "Add Quote";
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
  quoteFormDiv.appendChild(addQuoteBtn);
  document.querySelector("body").appendChild(quoteFormDiv);
}

function addQuote() {
  if (!userInputQuoteText.value || !userInputQuoteCategory.value) {
    addQuoteBtn.innerText = "Please, Enter quote";
  } else {
    addQuoteBtn.innerText = "Add Quote";
    quotes.push({
      text: userInputQuoteText.value,
      category: userInputQuoteCategory.value,
    });
    // update localStorage
    window.localStorage.setItem("quotes", JSON.stringify([...quotes]));
    userInputQuoteText.value = "";
    userInputQuoteCategory.value = "";
  }
}
// Implement JSON Export: Provide a button that allows users to export their quotes to a JSON file. Use Blob and URL.createObjectURL to create a download link.

// downloads the object as 'testJsonFile.json'
const JSONToFile = (obj, filename) => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
//Implement JSON Import: Provide a file input to allow users to upload a JSON file containing quotes. Read the file and update the quotes array and local storage accordingly.
//
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Populate Categories Dynamically:
/// Use the existing quotes array to extract unique categories and populate the dropdown menu.
let selectCatGroup = document.getElementById('categoryFilter');
function populateCategories(qts){
// qts =[{text:'',category:''},...]
let cats = JSON.parse(localStorage.getItem('quotes')).map(qt => qt.category);
Array.from(new Set(cats), cat => {
  let optionElement = document.createElement('option');
  optionElement.setAttribute('value',cat);
  optionElement.textContent = cat;
  selectCatGroup.appendChild(optionElement)
});
}

//Filter Quotes Based on Selected Category:Implement the filterQuotes function to update the displayed quotes based on the selected category.

function filterQuotes(){
  let filteredQuotes = JSON.parse(localStorage.getItem('quotes')).filter(qt => {
    return qt.category === selectCatGroup.value
  }).map(qt => '<q>' + qt.text + '</q>')
  quoteDisplay.innerHTML =  filteredQuotes.join('<br>');
  window.localStorage.setItem('lastUserSelection',JSON.stringify(selectCatGroup.value))
}
//Remember the Last Selected Filter: Use local storage to save the last selected category filter and restore it when the user revisits the page.
function showLastUserSelection(){
  if (JSON.parse(localStorage.getItem('lastUserSelection'))){
    let filteredQuotes = quotes.filter(qt => {
      return qt.category === JSON.parse(localStorage.getItem('lastUserSelection'))
    }).map(qt => '<q>' + qt.text + '</q>')
    quoteDisplay.innerHTML =  filteredQuotes.join('<br>');
  }
}

// After parsing html
document.addEventListener("DOMContentLoaded", () => {
  showLastUserSelection();
  newQuoteBtn.addEventListener("click", showRandomQuote);
  createAddQuoteForm();
  addQuoteBtn.addEventListener("click", addQuote);
  let exportButton = document.getElementById("exportBtn");
  // exportButton.addEventListener(
  //   "click",
  //   JSONToFile(...quotes, "Export Quotes")
  // );
  // Populate Categories Dynamically
  populateCategories(quotes);
});
// selectedCategory
