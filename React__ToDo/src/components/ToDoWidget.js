import React, { useState, useEffect } from 'react'
import { AiFillDelete, AiFillCheckCircle } from 'react-icons/ai'

function Task({ task, index, completeTask, removeTask }) {
    return (
        <div className="flex my-2 flex-row justify-between border-solid border-white border-2 rounded-lg p-2" style={{ textDecoration: task.completed ? "line-through" : ""}}>
            <h1 className='font-semibold text-lg text-white pr-4'>{task.title}</h1>
            <div className='flex gap-2'>
                <button onClick={() => completeTask(index)}><AiFillCheckCircle className='text-green-700 text-2xl'/></button>
                <button onClick={() => removeTask(index)}><AiFillDelete className='text-red text-2xl'/></button>
            </div>

        </div>
    )
}
function CreateTask({ addTask }) {
    const [ value, setValue ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!value) return
        addTask(value)
        setValue("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-row'>
                <input type='text' className='rounded-lg p-2' value={value} placeholder='Add a new task' onChange={e => setValue(e.target.value)} />
            </div>
        </form>
    )
}

function ToDoWidget() {
    const [ tasks, setTasks ] = useState(JSON.parse(localStorage.getItem('tasks'))) // Use JSON.parse to turn stringified tasks into object
    const [ tasksRemaining, setTasksRemaining ] = useState(0)

    useEffect(() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length) // Filter tasks where task isn't completed & get length of that array
        //https://stackoverflow.com/questions/2010892/how-to-store-objects-in-html5-localstorage-sessionstorage
        localStorage.setItem('tasks', JSON.stringify(tasks)) // Put item into storage; stringify as you can't store arrays only strings
    }, [tasks]) // Dependency array; useEffect will only fire when this variable is changed

    const addTask = (title) => {
        const newTasks = [...tasks, { title, completed: false }] // ...tasks is current tasks; add new task to list
        setTasks(newTasks)
    }

    const completeTask = (index) => {
        const newTasks = [...tasks] // Current array of tasks
        newTasks[index].completed = true // mark given index completed
        setTasks(newTasks)
    }

    const removeTask = (index) => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1) // Splice and remove 1 element at index
        setTasks(newTasks)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen bg-purple'>
            <h1 className='text-white text-center font-bold text-2xl'>Current Tasks: {tasksRemaining}</h1>
            <div className='flex flex-col rounded-lg gap-4'>    
                <div>
                  { tasks.map((task, index) => {
                    return (
                    <Task task={task} index={index} key={index} completeTask={completeTask} removeTask={removeTask} />
                    )
                  })}
                </div>

                <div>
                    <CreateTask addTask={addTask} />
                </div>
            </div>
        </div>
    )
}

export default ToDoWidget