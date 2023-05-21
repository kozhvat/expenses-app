'use strict';

// ПЕРЕМЕННЫЕ
const ZERO_HISTORY = 'Трат нет';
const CURRENCY = ' руб.';
const BASE_LIMIT = 10000;
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'expenses__status_bad';
const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';
const HISTORY_ITEM_CLASSNAE = 'expenses__history-item';

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
const totalValueNode = document.querySelector('[data-find="total"]');
const statusNode = document.querySelector('[data-find="status"]');
const historyNode = document.querySelector('[data-find="history"]');
const limitNode = document.querySelector('[data-find="limit"]');

let expenses = []; // создаём пустой массив для расходов с категориями
let currentLimit;
let whatMinus;
let expensesString;
// -------------------------------------------------------------------------------

// ПЕРВИЧНЫЙ КОД ПРИ ОТКРЫТИИ СТРАНИЦЫ
init(expenses);

function init() {
  initHistory();
  initLimit();
  render();
}
// -------------------------------------------------------------------------------

// ИНИЦИАЛИЗАЦИЯ ИСТОРИИ
function initHistory() {
  const expensesFromStorageString = localStorage.getItem(
    STORAGE_LABEL_EXPENSES
  );
  const expensesFromStorage = JSON.parse(expensesFromStorageString);

  // проверка существования массива в памяти браузера
  if (Array.isArray(expensesFromStorage)) {
    expenses = expensesFromStorage;
  } else {
    historyNode.innerText = ZERO_HISTORY;
    render();
  }
}
// -------------------------------------------------------------------------------

// ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ЛИМИТА
function initLimit() {
  const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
  if (limitFromStorage) {
    currentLimit = limitFromStorage;
    limitNode.innerText = currentLimit + CURRENCY;
  } else {
    currentLimit = BASE_LIMIT;
    limitNode.innerText = BASE_LIMIT + CURRENCY;
  }
}
// -------------------------------------------------------------------------------

// ДОБАВЛЕНИЕ НОВОГО ЛИМИТА В JAVASCRIPT
function trackNewLimit(newLimit) {
  currentLimit = newLimit;
}
// -------------------------------------------------------------------------------

// ПОЛУЧЕНИЕ НОВОГО ЛИМИТА ИЗ ПОЛЯ ВВОДА
function getNewLimitFromUser() {
  if (!inputChangeNode.value) {
    return null;
  }

  const newLimit = parseInt(inputChangeNode.value);

  return newLimit;
}
// -------------------------------------------------------------------------------

// ОЧИСТКА ПОЛЯ ВВОДА НОВОГО ЛИМИТА
function clearLimitInput() {
  inputChangeNode.value = '';
}
// -------------------------------------------------------------------------------

// СЧИТАЕМ СУММУ ТРАТ
function getTotal() {
  let sum = 0;

  expenses.forEach(function (expense) {
    sum += expense.amount;
  });
  return sum;
}
// -------------------------------------------------------------------------------

// ПОЛУЧЕНИЕ ЦИФРЫ ТРАТЫ ИЗ ПОЛЯ ВВОДА
function getExpenseFromUser() {
  const expense = parseInt(inputAddExpenseNode.value);
  return expense;
}
// -------------------------------------------------------------------------------

// ПОЛУЧЕНИЕ ВЫБРАННОЙ КАТЕГОРИИ
function getSelectedCategory() {
  if (inputAddCategoryNode.value === 'Категория') {
    return false;
  } else {
    return inputAddCategoryNode.value;
  }
}

// ОЧИСТИТКА ПОЛЯ ВВОДА ТРАТЫ И КАТЕГОИИ
function clearInput() {
  inputAddExpenseNode.value = '';
  inputAddCategoryNode.value = 'Категория';
}
// -------------------------------------------------------------------------------

// ОБЩАЯ ФУНКЦИЯ ОТРИСОВКИ ИСТОРИИ, СУММЫ И СТАТУСА
function render() {
  renderHistory(expenses);
  renderTotal(expenses);
  renderStatus(expenses);
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА НОВОГО ЛИМИТА
function renderNewLimit() {
  limitNode.innerText = currentLimit + CURRENCY;
}
// -------------------------------------------------------------------------------

// СОХРАНЕНИЕ ТРАТ В БРАУЗЕРЕ
function saveExpensesToStorage() {
  expensesString = JSON.stringify(expenses);
  localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА ИСТОРИИ ТРАТ
function renderHistory(expenses) {
  expenses.forEach((expense) => {
    const historyItem = document.createElement('li');

    historyItem.classList = HISTORY_ITEM_CLASSNAE;

    historyItem.innerText = `${expense.amount + CURRENCY} - ${
      expense.category
    }`;

    historyNode.appendChild(historyItem);
  });
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА ОБЩЕЙ СУММЫ ТРАТ
function renderTotal() {
  totalValueNode.innerHTML = `${getTotal(expenses) + CURRENCY}`;
}
// -------------------------------------------------------------------------------

// ОТРИСОВКА СТАТУСА
function renderStatus() {
  if (getTotal(expenses) <= currentLimit) {
    statusNode.innerHTML = STATUS_IN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    whatMinus = ` (-${getTotal(expenses) - currentLimit + CURRENCY})`;
    statusNode.innerHTML = `${STATUS_OUT_OF_LIMIT + whatMinus}`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
// -------------------------------------------------------------------------------

// ФУНКЦИЯ ОБРАБОТЧИКА НАЖАТИЯ КНОПКИ "ДОБАВИТЬ"
function addButtonHandler() {
  // сохраняем введённую сумму в переменную currentAmount(текущая сумма)
  const currentAmount = getExpenseFromUser();
  const currentCategory = getSelectedCategory();

  if (!currentCategory || !currentAmount || currentAmount < 0) {
    alert('Введите сумму больше 0 руб. и выберите категорию');
    return;
  }

  // сохраняем выбранную категорию в переменную currentCategory(текущая категория)
  const newExpense = { amount: currentAmount, category: currentCategory };

  expenses.push(newExpense);

  historyNode.innerHTML = '';

  saveExpensesToStorage();

  getTotal(expenses);

  render();

  clearInput();
}
// -------------------------------------------------------------------------------

// ФУНКЦИЯ ОБРАБОТЧИКА НАЖАТИЯ КНОПКИ "ИЗМЕНИТЬ ЛИМИТ"
function changeLimitHandler() {
  const newLimit = getNewLimitFromUser();

  if (!newLimit || newLimit < 0) {
    return;
  }

  trackNewLimit(newLimit);

  // сохранение лимита в браузере
  localStorage.setItem(STORAGE_LABEL_LIMIT, newLimit);

  renderNewLimit(newLimit);

  renderStatus(getTotal);

  togglePopup();

  clearLimitInput();
}
// -------------------------------------------------------------------------------

// ФУНКЦИЯ ОБРАБОТЧИКА НАЖАТИЯ КНОПКИ СБРОСА ТРАТ И ОБНОВЛЕНИЯ ВСЕГО
function clearButtonHandler() {
  localStorage.removeItem(STORAGE_LABEL_EXPENSES, expensesString);
  expenses = [];

  init();

  render();
}
// -------------------------------------------------------------------------------

// ОБРАБОТЧИК НАЖАТИЯ КНОПКИ "ДОБАВИТЬ"
buttonAddExpenseNode.addEventListener('click', addButtonHandler);

// ОБРАБОТЧИК НАЖАТИЯ КНОПКИ СБРОСА ТРАТ И ОБНОВЛЕНИЯ ВСЕГО
buttonResetExpensesNode.addEventListener('click', clearButtonHandler);

// ОБРАБОТЧИК НАЖАТИЯ КНОПКИ "ИЗМЕНИТЬ ЛИМИТ"
buttonChangeLimitNode.addEventListener('click', changeLimitHandler);
