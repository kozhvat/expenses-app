const expenses = [];
const inputNode = document.querySelector('[data-find="input"]');
const buttonNode = document.querySelector('[data-find="button"]');
const historyNode = document.querySelector('[data-find="history"]');

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
});
