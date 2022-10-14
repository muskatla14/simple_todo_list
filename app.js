const form = document.querySelector('#form');
const input = document.querySelector('.my-input');
const todoList = document.querySelector('#todos');
const errorSection = document.querySelector('.error-message');


// Display Items From Local Storage
document.addEventListener('DOMContentLoaded', getItemsFromLocalStorage);

// Add Todo Item
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
})

//  Delete Todo Item
todoList.addEventListener('click', deleteTodoItem);


    function getItemsFromLocalStorage() {
        let todoItems;

        if(localStorage.getItem('todoItems') === null) {
            todoItems = [];
        } else {
            todoItems = JSON.parse(localStorage.getItem('todoItems'))
        }

        todoItems.forEach(function(item) {
             // Create LI element
             const todoEl = document.createElement('li');
             // Create Delete Button
             const deleteButton = document.createElement('span');
             // Add Text to Button
             const closeTxt = document.createTextNode("\u00D7");
             // Add Class to Button
             deleteButton.classList.add('delete')
             // Append text to button
             deleteButton.appendChild(closeTxt)
             // Add Input Value to LI
             todoEl.innerText = item;
             // Append LI to UL
             todoList.appendChild(todoEl);
             // Append BUTTON TO LI
             todoEl.appendChild(deleteButton)
        })
    }



// Add Item On Todo List
function addTodo() {
        const todoItem = input.value;
        if (todoItem === '') {
            showErrorMessage('The field is empty!');
            return;
        }
        // Create LI element
        const todoEl = document.createElement('li');
        // Create Delete Button
        const deleteButton = document.createElement('span');
        // Add Text to Button
        const closeTxt = document.createTextNode("\u00D7");
        // Add Class to Button
        deleteButton.classList.add('delete')
        // Append text to button
        deleteButton.appendChild(closeTxt)
        // Add Input Value to LI
        todoEl.innerText = input.value;
        // Append LI to UL
        todoList.appendChild(todoEl);
        // Append BUTTON TO LI
        todoEl.appendChild(deleteButton)

    // Save Todo Item in LocalStorage
    addItemsInLocalStorage(input.value)

    // Clear input field
    input.value = '';
}

// Add Item in Local Storage Function
function addItemsInLocalStorage(todoItem) {


    let todoItems;

    if(localStorage.getItem('todoItems') === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(localStorage.getItem('todoItems'))
    }

    todoItems.push(todoItem);

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

//  Delete Item Function
function deleteTodoItem(e) {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
        console.log(e.target.parentElement.firstChild.textContent)
    }

    // Delete From Local Storage
    deleteItemFromLocalStorage(e.target.parentElement.firstChild.textContent);
}

// Delete From Local Srtorage
function deleteItemFromLocalStorage(todoItem) {
    let todoItems;

    if(localStorage.getItem('todoItems') === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(localStorage.getItem('todoItems'));
    }

    todoItems.forEach(function(item, index) {
        if(todoItem === item) {
            todoItems.splice(index, 1)
        }
    })

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}



// Show Error Message Function
function showErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('error');

    errorSection.appendChild(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 2000);
}