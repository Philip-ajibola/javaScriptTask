let TodoList = JSON.parse(localStorage.getItem('todoList')) || [];

const form  = document.querySelector('#form')
const task = document.querySelector('.add-task')
const taskContainer = document.querySelector('.task-container')

function renderTodoList() {
    taskContainer.innerHTML = ""
    TodoList.forEach((todo, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
      <div style="display: flex">
        <input type="checkbox">
        <p class="task-name">${todo} </p>
      </div>
       <div>
         <button class="button delete-button" data-index="${index}">
           Delete
         </button>     
       </div>
    `
        taskContainer.append(taskDiv)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(task.value)
    if(task.value){
        TodoList.push(task.value)
        localStorage.setItem('todoList', JSON.stringify(TodoList))
        console.log(localStorage.getItem('todoList'))
        renderTodoList()
    }
    task.value = ''
})

taskContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-button')){
        const index = e.target.getAttribute('data-index');
        TodoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(TodoList));
        renderTodoList();
    }
})

window.onload = renderTodoList;