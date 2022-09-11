
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

let tasks = []; 


// Функции
function addTask(event) {
 // Отменяем отправку формы
 event.preventDefault();

 // Достаем текст задачи из поля ввода
 const tasktext = taskInput.value;

  // Описываем задачу в виде обьекта
  const newTask = {
    id: Date.now(),
    text: tasktext,
    done: false
  };

  //Добавляем задачу в массив с задачами
  tasks.push(newTask);
  // Формируем css класс
  const cssClass = newTask.done ? "task title task-title--done" : 'task-title';

 // Формулируем разметку для новой задачи
 const taskHTML = `
             <li id ="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
             <span class="${cssClass}">${newTask.text}</span>
             <div class="task-item__buttons">
               <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
               </button>
               <button type="button" data-action="delete" class="btn-action">
                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
               </button>
             </div>
           </li>`;
 // Добавляем задачу на страницу
 tasksList.insertAdjacentHTML('beforeend', taskHTML);

 // Очищаем поле ввода и возвращаем на него фокус
 taskInput.value = '';
 taskInput.focus();

 // Если в списке задач более 1-го элемента, скрываем блок / список дел пуст
 if (tasksList.children.length > 1) {
   emptyList.classList.add('none');
 }
}

function deleteTask(event) {  
  //Проверяем если клик был не по кнопке 'удалить задачу'
  if (event.target.dataset.action !== 'delete') return;

  //Проверяем если клик был по кнопке 'удалить задачу'
  const parenNode = event.target.closest('.list-group-item');

  // Определяем ID задачи
  const id = Number(parenNode.id);


  // Находим индекс задачи в массиве
  const index = tasks.findIndex(function (task) {
    return task.id === id;
  });

  // Удаляем задачу из массива
  tasks.splice(index, 1);

  // Удаляем задачу из разметки
  parenNode.remove();

  //Проверка, если в списке задач более 1-го элемента, показываем блок список задач 
  if (tasksList.children.length === 1) {
    emptyList.classList.remove('none');
  } 
}

// отмечаем задачу завершенной

function doneTask(event) {
  //Проверяем что клик был НЕ по кнопке задача выполнена

  if (event.target.dataset.action !== "done") return

  //Проверяем что клик был по кнопке задача выполнена  
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

}


