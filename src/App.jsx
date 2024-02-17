import { useState, useEffect,useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import authService from './appwrite/auth';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


function App() {
  const [todos, settodos] = useState([])
  const [todo, settodo] = useState("")
  const [finished, setfinished] = useState(false)
  const inputRef = useRef()

  useEffect( () => {
    inputRef.current.focus();
    let y = [];
    const fetchData=async ()=>{
      try {
        const x = await authService.getAll();
        x.documents.map((item) => {
          y = [...y, { docid:item.$id,id: item.ID, todo: item.Todo, isCompleted: item.isComplete }];
        });
        settodos(y);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, [])


  const showfinished =(e) => {
    setfinished(!finished)
  }
  

  const handleAdd = () => {
    if(todo.length<=3){
      inputRef.current.classList.add('outline-red-400');
      inputRef.current.setAttribute("placeholder","Minimum 4 characters required")
      settodo('');
    }else{
        let newTodos = [...todos, { id: uuidv4() ,todo, isCompleted: false }];
         settodos(newTodos)
        if(newTodos.length>0){
          authService.writeOn(newTodos[newTodos.length-1])
        }
      settodo("")
    }
  }
  const keySave= (e) => {
    if(e.key === 'Enter'){
      if(todo.length>3){
        let newTodos = [...todos, { id: uuidv4() ,todo, isCompleted: false }];
         settodos(newTodos)
        if(newTodos.length>0){
          authService.writeOn(newTodos[newTodos.length-1])
        }
        settodo("")
      }else{
        inputRef.current.classList.add('outline-red-400');
        inputRef.current.setAttribute("placeholder","Minimum 4 characters required")
        settodo('');
      }
    }
  }
  

  const handleDelete = (e,id) => {
    let getid = todos.filter(item=>{
      return item.id === id
    })
    let newtodos = todos.filter(item=>{
      return item.id !== id
    })
    settodos(newtodos)
    authService.delteFile(getid[0].docid)
  }

  const handleEdit = (e,id) => {
    let edit = todos.filter(i=> i.id === id);
    settodo(edit[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id !== id
    })
    settodos(newtodos)
    inputRef.current.focus();
    authService.delteFile(edit[0].docid)
  }

  const handleChange = (e) => {
    settodo(e.target.value)
    inputRef.current.classList.remove('outline-red-400');
    inputRef.current.removeAttribute("placeholder")
  }

  const handleCheckbox=(e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    authService.deleteAll();
    newtodos.map((item)=>{
      authService.writeOn(item)
    })
    settodos(newtodos)
    console.log(todos);
  }

  return (
    <>
      <Navbar />
      <div className="lower flex justify-center px-5">
        <div className="box sm:w-[35%] h-[80vh] sm:h-[88vh] mt-3 bg-secondary p-3 px-4 rounded-lg">
          <h1 className="text-center text-3xl my-4">Welcome to Task Manager</h1>
          <div className="head">
            <h2 className='text-xl mb-3'>Add Todo</h2>
            <div className="search flex">
              <input ref={inputRef} onChange={handleChange} onKeyDown={keySave} value={todo} type="text" className='w-[90%] rounded-full px-2 outline-gray-500 outline-1 placeholder:' />
              <button className='py-1 px-3 rounded-full bg-primary mx-2 ' onClick={handleAdd}>ADD</button>
            </div>
          </div>
          <div className="bottom flex flex-col gap-3 pt-3 h-[70%]">
            <div className="check flex">
              <input onChange={showfinished} type="checkbox" name="done" id="done" checked={finished} />
              <label htmlFor="done" className='ml-1 text-xs'>Show completed tasks</label>
            </div>
          <div className="h-[1px] bg-primary"></div>
            <div className="last space-y-4 h-[80%]">
              <h2 className='text-xl'>Your Todos</h2>
              <div className="all-todos overflow-y-auto h-[90%] scrollbar scrollbar scrollbar-thin">
               { todos.length == 0 ? <div className='ml-3 text-gray-500 text-sm'>No todos to display</div>: 
                (finished && !todos.find(i => i.isCompleted == true)) ? <div className='ml-3 text-gray-500 text-sm'>Not Completed any tasks yet</div>: (!finished && !todos.find(i=>i.isCompleted == false)) && <div className='ml-3 text-gray-500 text-sm'>No Tasks there to Do</div>
               }
                {todos.map((item) => {
                  return (finished && item.isCompleted || !finished && !item.isCompleted) && (
                  <div key={item.id} className="todo flex justify-between my-2 items-center">
                    <div className="todo-text flex items-center">
                      <input onChange={handleCheckbox} type="checkbox" name={item.id} id={item.id} checked= {item.isCompleted} />
                      <label htmlFor={item.id}className={`ml-2 text-xs ${item.isCompleted?"line-through":""}`}>{item.todo}</label>
                    </div>
                    <div className="editing flex h-full">
                      <button className='px-2 rounded-md mx-2 bg-primary text-xs sm:text-sm py-1' onClick={(e)=>{handleEdit(e,item.id)}}><FaRegEdit /></button>
                      <button className='px-2 rounded-md mx-2 bg-primary text-xs sm:text-sm py-1' onClick={(e)=>{handleDelete(e,item.id)}}><MdDelete /></button>
                    </div>
                  </div>)
                })}
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
