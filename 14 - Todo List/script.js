const dateEl = document.querySelector(".date");
const hourEl = document.querySelector(".time");
const todoInput = document.getElementById("todo-input");
const editInput = document.getElementById("edit-input");
const todoSubmit = document.getElementById("todo-submit");
const editSubmit = document.getElementById("edit-submit");
const todoList = document.querySelector(".todos");
const todoForm = document.querySelector(".todo-form");
const editForm = document.querySelector(".edit-form");

// Reference to the todo being edited
let todoToEdit = null;

// Update Date And Hours
setInterval(() => {
  const date = new Date().toDateString();
  dateEl.textContent = date;
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();

  hourEl.textContent = `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
});

function addTodo(e) {
  e.preventDefault();
  //   If Input is not empty > add new Todo
  todoInput.value && addNewTodo();
}

function addNewTodo() {
  const todoText = todoInput.value;
  todoInput.value = "";

  // Create new div element
  const newTodoElement = document.createElement("div");
  newTodoElement.classList.add("todo");
  newTodoElement.innerHTML = `
    <h3>${todoText}</h3> 
    <button class="finish-todo">
      <ion-icon class="icon" name="checkmark-outline"></ion-icon>
    </button>
    <button class="edit-todo">
      <ion-icon class="icon" name="create-outline"></ion-icon>
    </button>
    <button class="remove-todo">
      <ion-icon class="icon" name="close-outline"></ion-icon>
    </button>
  `;

  // Add new div to todo list
  todoList.appendChild(newTodoElement);
}

function done(e) {
  if (
    e.target.classList.contains("finish-todo") ||
    e.target.closest(".finish-todo")
  ) {
    e.target.closest(".todo").classList.toggle("done");
  }
}

function removeToDo(e) {
  if (
    e.target.classList.contains("remove-todo") ||
    e.target.closest(".remove-todo")
  ) {
    e.target.closest(".todo").remove();
  }
}

function editToDo(e) {
  const todoElement = e.target.closest(".todo");

  if (e.target.classList.contains("edit-todo") && todoElement) {
    // Store reference to the todo being edited
    todoToEdit = todoElement;

    // Hide todo list, show edit form, and pre-fill the edit input
    todoList.classList.add("hide");
    todoForm.classList.add("hide");
    editForm.classList.remove("hide");

    editInput.value = todoElement.querySelector("h3").textContent;
  }
}

function submitEdit(e) {
  e.preventDefault();

  if (todoToEdit) {
    // Update the text of the todo being edited
    todoToEdit.querySelector("h3").textContent = editInput.value;

    // Reset variables and UI
    todoToEdit = null;
    editInput.value = "";
    todoList.classList.remove("hide");
    todoForm.classList.remove("hide");
    editForm.classList.add("hide");
  }
}

// Event Listeners
todoSubmit.addEventListener("click", addTodo);
editSubmit.addEventListener("click", submitEdit);

todoList.addEventListener("click", function (e) {
  done(e);
  removeToDo(e);
  editToDo(e);
});
