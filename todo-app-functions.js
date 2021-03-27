//Get saved todos from Local storage
const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos')

    if(todoJSON !== null){
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}
   //asdf
//Save todos after todo added button clicked
const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}
//Render todos based on the filters
const renderTodos = function(todos, filters) {
    console.log(todos)
    const filteredTodos = todos.filter(function(todo){
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })
    
    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos)) 
    
    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Set up remove todo button
const removeTodo = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id 
    })
    if(todoIndex > -1){
    todos.splice(todoIndex, 1)
    }
}
//toggle completed value for todo
const toggleTodo = function(id){
    const todo = todos.find(function(todo){
        return todo.id === id
    })
    if (todo !== undefined){
        todo.completed = !todo.completed
    }
}

//add new DOM element for new todos
const generateTodoDOM = function(todo){
    const todoEl = document.createElement('div')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    const checkbox = document.createElement('input')

    //Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function(){
       toggleTodo(todo.id)
       saveTodos(todos)
       renderTodos(todos, filters)
        
    })
    //Setup todo text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //Setup todo button
    removeButton.textContent = 'Delete'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', function(e){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

//Create a DOM ELem4ent for a summary 
const generateSummaryDOM = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent = `Your have ${incompleteTodos.length} todos left`
    return summary
}