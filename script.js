const add_input = document.getElementById('add-input')
const add_button = document.getElementById('add-button')
const all_todos = document.querySelector('.all-todos')
const completed_number = document.getElementById('completed-number')
const select_all = document.getElementById('select-all')
const delete_all = document.getElementById('delete-all')

let todos = []

const onSelectAll = () => {
    todos = todos.map(el => {
        el.isCompleted = !el.isCompleted
        return el
    })
    onAddTodo()
}

const onRemoveAllCompleted = () => {
    todos = todos.filter(el => el.isCompleted == false)
    onAddTodo()
}

const onCompleted = (id) => {
    todos = todos.map(el => {
        if (el.id === id) {
            el.isCompleted = !el.isCompleted
        }
        return el
    })
    onAddTodo()
}

const onRemove = (id) => {
    todos = todos.filter(el => el.id !== id)
    onAddTodo()
}

const onAddTodo = () => {
    while(all_todos.firstChild){
        all_todos.removeChild(all_todos.firstChild)
    }
    todos.forEach(el => {
        const todo_text = document.createElement('span')
        const todo = document.createElement('div')
        const remove_button = document.createElement('button')
        const check = document.createElement('input')

        check.setAttribute('type', 'checkbox')
        if(el.isCompleted){
            check.checked = true
        }

        todo_text.innerHTML = el.text
        remove_button.innerHTML = 'Remove'

        todo.append(check, todo_text, remove_button)
        all_todos.append(todo)

        check.addEventListener('click', () => onCompleted(el.id))
        remove_button.addEventListener('click', () => onRemove(el.id))
    })
    completed_number.innerHTML = `${todos.filter(el => el.isCompleted).length} / ${todos.length}`
}

const onAdd = (text) => {
    todos = [...todos, {
        id: Math.random(),
        text: text,
        isCompleted: false
    }]
    onAddTodo()
}

add_button.addEventListener('click', () => {
    if(add_input.value == ''){
        alert('Fill all !')
    }else {
        onAdd(add_input.value)
        add_input.value = ''
    }
})
select_all.addEventListener('click', () => onSelectAll())
delete_all.addEventListener('click', () => onRemoveAllCompleted())