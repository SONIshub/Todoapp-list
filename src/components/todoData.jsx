import React from 'react'
import { useState,useEffect} from 'react'


const todoData = () => {
    const [input, setInput] = useState("")
  
    const [Todo, setTodo] = useState(() => {
        const localData = localStorage.getItem("Todos-app");
        if (localData === null || localData === undefined) {
          return [];
        } else {
          try {
            return JSON.parse(localData);
          } catch (error) {
            console.error("Error parsing local storage:", error);
            return [];
          }
        }
      });

    const [edit, setEdit] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)

    const submitData = (e) => {
        e.preventDefault()
        if (!input) return;
        setTodo([...Todo, input])
        setInput("")
    }

    useEffect(() => {
        localStorage.setItem("Todos-app", JSON.stringify(Todo));
      }, [Todo]);
    
    // localStorage.setItem("Todos-app",JSON.stringify(Todo))

    const handleDelete = (index) => {
        const newTodo = Todo.filter((ele, i) => i !== index)
        setTodo(newTodo)
    }

    const handleEdit = (index) => {
        setEdit(true)
        setEditingIndex(index)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const updatedTodo = Todo.map((ele, i) => {
            if (i === editingIndex) {
                return input
            }
            return ele
        })
        setTodo(updatedTodo)
        setEdit(false)
        setInput("")
    }

    return (
        <>
            <div className="container">
                <h1>Todo List App</h1>
                <div className="card-box">
                    <div className="input-button">
                        <form  onSubmit={submitData} >
                            <input className='inputField' type="text" value={input} placeholder='Add items here...' onChange={(e) => setInput(e.target.value)} />
                            <button type='submit'>Save</button>
                        </form>
                        {
                            Todo.map((ele, index) => {
                                return (
                                    <div key={index} className="output-box">
                                        <div className='outputMang'>
                                            {edit && editingIndex === index ? (
                                                <form onSubmit={handleUpdate}>
                                                    <input className='handleupdateInput' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                                                    <button className='updateBtn' type='submit'>Done</button>
                                                </form>
                                            ) : (
                                                <p>{ele}</p>
                                            )}
                                            <div className='btns'>
                                                <button className='editBtn' onClick={() => handleEdit(index)}>
                                                    <span class="material-symbols-outlined">
                                                        edit
                                                    </span>
                                                </button>
                                                <button className='deleteBtn' onClick={() => handleDelete(index)}>
                                                    <span class="material-symbols-outlined">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default todoData
