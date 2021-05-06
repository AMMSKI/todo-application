'use strict'

//Get saved todos from Local storage
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos')

    try{
        return todoJSON ? JSON.parse(todoJSON) : []
    }catch(e){
        return []
    }  
}   

//Save todos after todo added button clicked
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Render todos based on the filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    console.log(todos)
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed
    })
    
    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos)) 

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No todos have been added'
        todoEl.appendChild(messageEl)
    }
}

//Set up remove todo button
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1){
    todos.splice(todoIndex, 1)
    }
}
//toggle completed value for todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo){
        todo.completed = !todo.completed
    }
}

//add new DOM element for new todos
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    const checkbox = document.createElement('input')

    //Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
       toggleTodo(todo.id)
       saveTodos(todos)
       renderTodos(todos, filters)
        
    })
    //Setup todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //Setup todo button
    removeButton.textContent = 'Delete'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

//Create a DOM ELem4ent for a summary 
const generateSummaryDOM = (incompleteTodos) => {
    const summaryEl = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summaryEl.textContent = `Your have ${incompleteTodos.length} todo${plural} left`
    summaryEl.classList.add('list-title')
    return summaryEl
}