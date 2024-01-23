const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Add Transactions
function addTransaction(e) {
  e.preventDefault();

  if (!text.value.trim() || !amount.value.trim()) {
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionToDom(transaction);
    updateValues();

    UpdateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

//Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 100000);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  UpdateLocalStorage();
  init();
}

function addTransactionToDom(transaction) {
  //Get Sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(`${transaction.amount < 0 ? "minus" : "plus"}`);

  item.innerHTML = `
  ${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick = "removeTransaction(${
    transaction.id
  })">x</button>
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

//Update Local Storage Trans
function UpdateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);
