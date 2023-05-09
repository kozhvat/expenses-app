const expenses = [];
const inputNode = document.querySelector('[data-find="input"]');
const buttonNode = document.querySelector('[data-find="button"]');
const LIMIT = 10000;
const limitNode = document.querySelector('[data-find="limit"]');
const sumNode = document.querySelector('[data-find="sum"]');
const statusNode = document.querySelector('[data-find="status"]');
const historyNode = document.querySelector('[data-find="history"]');
limitNode.innerText = `${LIMIT} руб.`;
statusNode.innerText = 'все хорошо';

buttonNode.addEventListener('click', function () {
  // Получаем значение из поля ввода
  if (!inputNode.value) {
    return;
  }
  const expense = parseInt(inputNode.value);
  inputNode.value = '';

  // Сохраняем трату в список
  expenses.push(expense);

  // Выведем новый список трат
  let expensesListHTML = '';
  expenses.forEach((element) => {
    expensesListHTML += `<li class="expenses__history-item">${element} руб.</li>`;
  });

  historyNode.innerHTML = `<ol class="expenses__history-list">${expensesListHTML}</ol>`;

  // Посчитать сумму и вывести её
  let sum = 0;

  expenses.forEach((element) => {
    sum += parseInt(`${element} руб.`);
  });

  sumNode.innerText = sum;

  // Сравнить сумму с лимитом и вывести статус
  if (sum <= LIMIT) {
    statusNode.innerHTML = 'все хорошо';
    statusNode.classList.remove('expenses__status_bad');
  } else {
    statusNode.innerHTML = 'все плохо';
    statusNode.classList.add('expenses__status_bad');
  }
});
