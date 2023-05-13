let LIMIT = 10000;
let sum = '';
const CURRENCY = ' руб.';
let whatMinus = '';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'expenses__status_bad';
const HISTORY = 'Трат нет';

const inputAddExpenseNode = document.querySelector(
  '[data-find="input-add-expense"]'
);
const buttonAddExpenseNode = document.querySelector(
  '[data-find="button-add-expense"]'
);
const buttonResetExpensesNode = document.querySelector(
  '[data-find="button-reset-expenses"]'
);
const limitNode = document.querySelector('[data-find="limit"]');
const sumNode = document.querySelector('[data-find="sum"]');
const statusNode = document.querySelector('[data-find="status"]');
const historyNode = document.querySelector('[data-find="history"]');

const expenses = [];

init(expenses);

buttonAddExpenseNode.addEventListener('click', function () {
  const expense = getExpenseFromUser();

  if (!expense || expense < 0) {
    return;
  }

  trackExpense(expense);

  render(expenses);
});

function init(expenses) {
  limitNode.innerText = LIMIT + CURRENCY;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses) + CURRENCY;
  historyNode.innerText = HISTORY;
}

function trackExpense(expense) {
  expenses.push(expense);
}

function getExpenseFromUser() {
  if (!inputAddExpenseNode.value) {
    return null;
  }

  const expense = parseInt(inputAddExpenseNode.value);

  clearInput();

  return expense;
}

function clearInput() {
  inputAddExpenseNode.value = '';
}

function calculateExpenses(expenses) {
  sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

function render(expenses) {
  sum = calculateExpenses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory(expenses) {
  let expensesListHTML = '';
  expenses.forEach((element) => {
    expensesListHTML += `<li class="expenses__history-item">${
      element + CURRENCY
    }</li>`;
  });

  historyNode.innerHTML = `<ol class="expenses__history-list">${expensesListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerHTML = `${sum + CURRENCY}`;
}

function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerHTML = STATUS_IN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    whatMinus = ` (-${sum - LIMIT + CURRENCY})`;
    statusNode.innerHTML = `${STATUS_OUT_OF_LIMIT + whatMinus}`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

buttonResetExpensesNode.addEventListener('click', function () {
  resetExpenses(expenses);

  render(expenses);

  init(expenses);
});

function resetExpenses(expenses) {
  expenses.splice(0, expenses.length);
}

//

//

//

//

//
const inputChangeNode = document.querySelector(
  '[data-find="input-change-limit"]'
);
const buttonChangeLimitNode = document.querySelector(
  '[data-find="button-change-limit"]'
);

renderNewLimit(sum);

buttonChangeLimitNode.addEventListener('click', function () {
  const newLimit = getNewLimitFromUser();

  if (!newLimit || newLimit < 0) {
    return;
  }

  trackNewLimit(newLimit);

  renderNewLimit(newLimit);

  renderStatus(sum);

  togglePopup();
});

function trackNewLimit(newLimit) {
  LIMIT = newLimit;
}

function getNewLimitFromUser() {
  if (!inputChangeNode.value) {
    return null;
  }

  const newLimit = parseInt(inputChangeNode.value);

  clearLimitInput();

  return newLimit;
}

function clearLimitInput() {
  inputChangeNode.value = '';
}

function renderNewLimit() {
  limitNode.innerText = LIMIT + CURRENCY;
}
