const taskInput = document.querySelector('#taskInput')
const addTaskBtn = document.querySelector('#addTaskBtn')
const tasksUL = document.querySelector('#tasksUL')

taskInput.focus()

let taskList = []
let taskVal = ''
let newTaskVal = ''

const taskInputHandler = e => {
    taskVal = e.target.value
}

const addTaskBtnHandler = e => {
    e.preventDefault()
    if(taskVal != ''){
        const newTask = {
            task: taskVal,
            isChecked: false,
            isEditable: false
        }
        taskInput.value = ''
        taskVal = ''
        taskList.unshift(newTask)
        displayTasks()
    } else {
        alert('Enter a Task')
    } 
}

const cbHandler = (index) => {
    const myList = [...taskList]
    myList[index].isChecked = !myList[index].isChecked
    taskList = [...myList]
    displayTasks()
}

const delBtnHandler = index => {
    const myList = [...taskList]
    myList.splice(index, 1)
    taskList = [...myList]
    displayTasks()
}

const editBtnHandler = index => {
    console.log(index)
    const myList = [...taskList]
    myList[index].isEditable = !myList[index].isEditable
    displayTasks()
}

const newTaskInputHandler = e => {
    newTaskVal = e.target.value
}

const modifyBtnHandler = (index) => {
    const myList = [...taskList]
    myList.splice(index, 1)
    const modifiedTask = {
        task: newTaskVal,
        isChecked: false,
        isEditable: false
    }
    myList.unshift(modifiedTask)
    taskList = [...myList]
    displayTasks()
}

function displayTasks(){
    const myList = [...taskList]
    tasksUL.innerText = ''
    myList.map((task, index) => {
        const li = document.createElement('li')
        li.classList.add('li')
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('taskDiv')
        if(task.isEditable){
            const newTaskInput = document.createElement('input')
            newTaskInput.value = task.task
            newTaskVal = task.task
            newTaskInput.addEventListener('change', e => newTaskInputHandler(e))

            const modifyBtn = document.createElement('button')
            modifyBtn.innerText = 'modify'
            modifyBtn.classList.add('btn')
            modifyBtn.addEventListener('click', () => modifyBtnHandler(index))

            const delBtn = document.createElement('button')
            delBtn.innerText = 'DEL'
            delBtn.classList.add('btn')
            delBtn.addEventListener('click', () => delBtnHandler(index))

            taskDiv.appendChild(newTaskInput)
            taskDiv.appendChild(modifyBtn)
            taskDiv.appendChild(delBtn)
        } else {
                task.isChecked ? taskDiv.style.textDecoration = 'line-through' : taskDiv.style.textDecoration = 'none'

                const cbDiv = document.createElement('div')
                cbDiv.classList.add('cbDiv')
                const cb = document.createElement('input')
                cb.type= 'checkbox'
                cb.classList.add('cb')
                cb.checked = task.isChecked
                cb.addEventListener('change', () => cbHandler(index))
                cbDiv.appendChild(cb)
                
                const taskSpan = document.createElement('span')
                taskSpan.innerText = task.task
                taskSpan.classList.add('taskSpan')

                const editBtn = document.createElement('button')
                editBtn.innerHTML = 'EDIT'
                editBtn.classList.add('btn')
                editBtn.addEventListener('click', () => editBtnHandler(index))

                const delBtn = document.createElement('button')
                delBtn.innerText = 'DEL'
                delBtn.classList.add('btn')
                delBtn.addEventListener('click', () => delBtnHandler(index))

                taskDiv.appendChild(cbDiv)
                taskDiv.appendChild(taskSpan)
                taskDiv.appendChild(editBtn)
                taskDiv.appendChild(delBtn)
        }
        li.appendChild(taskDiv)
        tasksUL.appendChild(li)
    })
}

taskInput.addEventListener('change', taskInputHandler)
addTaskBtn.addEventListener('click', addTaskBtnHandler)