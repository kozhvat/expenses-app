const LIMIT = 10000;
const CURRENCY = ' руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_IN_LIMIT_CLASSNAME = 'expenses__status_bad';
const HISTORY = 'Трат нет';

const inputNode = document.querySelector('[data-find="input-add-expense"]');
const buttonAddNode = document.querySelector(
  '[data-find="button-add-expense"]'
);
const limitNode = document.querySelector('[data-find="limit"]');
const sumNode = document.querySelector('[data-find="sum"]');
const statusNode = document.querySelector('[data-find="status"]');
const historyNode = document.querySelector('[data-find="history"]');

const expenses = [];

init(expenses);

buttonAddNode.addEventListener('click', function () {
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
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearInput();

  return expense;
}

function clearInput() {
  inputNode.value = '';
}

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

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
    statusNode.classList.remove(STATUS_IN_LIMIT_CLASSNAME);
  } else {
    statusNode.innerHTML = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_IN_LIMIT_CLASSNAME);
  }
}
