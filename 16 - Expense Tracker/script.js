const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Pizza", amount: -10 },
  { id: 4, text: "Sold PC", amount: 280 },
  { id: 5, text: "Camera", amount: -85 },
];

let transactions = dummyTransactions;

function addTransactionToDom(transaction) {
  //Get Sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(`${transaction.amount < 0 ? "minus" : "plus"}`);

  item.innerHTML = `
  ${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">x</button>
  `;
  list.appendChild(item);
}
// Update Balance income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = Math.abs(
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);
  balance.textContent = `$${total}`;
  money_plus.textContent = `$${income}`;
  money_minus.textContent = `$${expense}`;
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionToDom);
  updateValues();
}

init();
