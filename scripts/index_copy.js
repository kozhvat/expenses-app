let LIMIT = 10000;
let whatMinus;
const CURRENCY = ' руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'expenses__status_bad';
const HISTORY = 'Трат нет';

const inputAddExpenseNode = document.querySelector(
  '[data-find="input-add-expense"]'
);
const inputAddCategoryNode = document.querySelector(
  '[data-find="input-add-category"]'
);
const buttonAddExpenseNode = document.querySelector(
  '[data-find="button-add-expense"]'
);
const inputChangeNode = document.querySelector(
  '[data-find="input-change-limit"]'
);
const buttonChangeLimitNode = document.querySelector(
  '[data-find="button-change-limit"]'
);
const buttonResetExpensesNode = document.querySelector(
  '[data-find="button-reset-expenses"]'
);
const limitNode = document.querySelector('[data-find="limit"]');
const totalValueNode = document.querySelector('[data-find="total"]');
const statusNode = document.querySelector('[data-find="status"]');
const historyNode = document.querySelector('[data-find="history"]');
// -------------------------------------------------------------------------------

const expenses = [];

// СЧИТАЕМ СУММУ ТРАТ
const getTotal = function () {
  let sum = 0;

  expenses.forEach(function (expense) {
    sum += expense.amount;
  });
  return sum;
};
// -------------------------------------------------------------------------------

// ПЕРВИЧНЫЙ КОД

init(expenses);

function init() {
  limitNode.innerText = LIMIT + CURRENCY;
  statusNode.innerText = STATUS_IN_LIMIT;
  totalValueNode.innerText = getTotal(expenses) + CURRENCY;
  historyNode.innerText = HISTORY;
}
// -------------------------------------------------------------------------------

// ОСНОВНОЙ КОД
buttonAddExpenseNode.addEventListener('click', function () {
  // сохраняем введённую сумму в переменную currentAmount(текущая сумма)
  const currentAmount = getExpenseFromUser();
  const currentCategory = getSelectedCategory();

  if (!currentCategory || !currentAmount || currentAmount < 0) {
    return;
  }

  // сохраняем выбранную категорию в переменную currentCategory(текущая категория)

  const newExpense = { amount: currentAmount, category: currentCategory };

  expenses.push(newExpense);

  getTotal(expenses);

  render();

  clearInput();
});
// -------------------------------------------------------------------------------

// ОБЩАЯ ФУНКЦИЯ ОТРИСОВКИ ИСТОРИИ, СУММЫ И СТАТУСА
function render() {
  renderHistory(expenses);
  renderTotal(expenses);
  renderStatus(expenses);
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА ОБЩЕЙ СУММЫ ТРАТ
function renderTotal() {
  totalValueNode.innerHTML = `${getTotal(expenses) + CURRENCY}`;
}
// -------------------------------------------------------------------------------

// БЕРЁМ ЦИФРУ ТРАТЫ ИЗ ПОЛЯ ВВОДА
function getExpenseFromUser() {
  const expense = parseInt(inputAddExpenseNode.value);
  return expense;
}
// -------------------------------------------------------------------------------

function getSelectedCategory() {
  if (inputAddCategoryNode.value === 'Выберите категорию') {
    return false;
  }
  return inputAddCategoryNode.value;
}

// ОЧИСТИТЬ ПОЛЯ ВВОДА ТРАТЫ И КАТЕГОИИ
function clearInput() {
  inputAddExpenseNode.value = '';
  inputAddCategoryNode.value = 'Выберите категорию';
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА ИСТОРИИ ТРАТ
function renderHistory(expenses) {
  historyNode.innerHTML = '';

  expenses.forEach((expense) => {
    const historyItem = document.createElement('li');

    // добавляем трате класс rub
    historyItem.className = 'expenses__history-item rub';

    historyItem.innerText = `${expense.category} - ${
      expense.amount + CURRENCY
    }`;
    historyNode.appendChild(historyItem);
  });
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА СТАТУСА
function renderStatus() {
  if (getTotal(expenses) <= LIMIT) {
    statusNode.innerHTML = STATUS_IN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    whatMinus = ` (-${getTotal(expenses) - LIMIT + CURRENCY})`;
    statusNode.innerHTML = `${STATUS_OUT_OF_LIMIT + whatMinus}`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
// -------------------------------------------------------------------------------

// ВЫЗОВ СБРОСА ТРАТ И ОБНОВЛЕНИЕ ВСЕГО
buttonResetExpensesNode.addEventListener('click', function () {
  resetExpenses(expenses);

  render(expenses);

  init(expenses);
});
// -------------------------------------------------------------------------------

// СБРОС ТРАТ
function resetExpenses(expenses) {
  expenses.splice(0, expenses.length);
}
// -------------------------------------------------------------------------------

// ВЫЗОВ ОТРИСОВКИ НОВОГО ЛИМИТА
renderNewLimit(getTotal);

// ОСНОВНОЙ КОД НОВОГО ЛИМИТА
buttonChangeLimitNode.addEventListener('click', function () {
  const newLimit = getNewLimitFromUser();

  if (!newLimit || newLimit < 0) {
    return;
  }

  trackNewLimit(newLimit);

  renderNewLimit(newLimit);

  renderStatus(getTotal);

  togglePopup();
});
// -------------------------------------------------------------------------------

// ДОБАВЛЕНИЕ НОВОГО ЛИМИТА В JAVASCRIPT
function trackNewLimit(newLimit) {
  LIMIT = newLimit;
}
// -------------------------------------------------------------------------------

// ПОЛУЧЕНИЕ НОВОГО ЛИМИТА ИЗ ПОЛЯ ВВОДА
function getNewLimitFromUser() {
  if (!inputChangeNode.value) {
    return null;
  }

  const newLimit = parseInt(inputChangeNode.value);

  clearLimitInput();

  return newLimit;
}
// -------------------------------------------------------------------------------

// ОЧИСТКА ПОЛЯ ВВОДА НОВОГО ЛИМИТА
function clearLimitInput() {
  inputChangeNode.value = '';
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА НОВОГО ЛИМИТА
function renderNewLimit() {
  limitNode.innerText = LIMIT + CURRENCY;
}
// -------------------------------------------------------------------------------
