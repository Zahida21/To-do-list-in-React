import { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, Setshowfinished] = useState(true)

  useEffect(() => {
   let todoString=localStorage.getItem("todos")
   if(todoString){

     let todos=JSON.parse(localStorage.getItem("todos"))
     setTodos(todos)
    }
    
  }, [])
  

  const SaveToLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const Togglefinishe=(e) => {
    Setshowfinished(!showfinished)
    
  }
  

  const handleEdit = (e,id) => {
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newtodos)  
    SaveToLS()

  }
  const handledelete = (e, id) => {
  
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })
    
    setTodos(newtodos)
    SaveToLS()
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
    
    

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    SaveToLS()
    
  }
  const handlecheckbox = (e) => {
    let id = e.target.name
   
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    setTodos(newtodos)
    SaveToLS()
  }

  


  return (
    <>
      <Navbar />
      <div className="container mx:3 md:mx-auto my-5 rounded-xl p-5 md:w-[35%] bg-slate-200 min-h-[80vh]" >
        <h1 className='font-bold text-center text-3xl' >Manage your Tasks at One place</h1>
        <div className="add-todo my-5 flex
        flex-col gap-4">
          <h2 className='text-xl font-bold'>Add Tasks</h2>
          <div className="flex">
          <input onChange={handlechange} className='w-full rounded-full px-5 py-1' type="text" value={todo} />
          <button onClick={handleAdd} disabled={todo.length<=3} className='mx-2 bg-slate-800 hover:bg-slate-950  px-5 py-3 text-sm text-white rounded-full font-bold disabled:bg-slate-900 cursor-pointer'>Add</button>
          </div>
        </div>

        <input className='my-4' onChange={Togglefinishe} type="checkbox"checked={showfinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[0.5px] bg-black opacity-20 w-[90%] my-2 mx-auto' ></div>

        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos w-full">
          {todos.length ===0 && <div className='m-5'>List your Todos</div> }
          {todos.map(item => {


            return(showfinished||!item.isCompleted)&& <div key={item.id} className="todo flex  my-4 justify-between">
              <div className='flex gap-5'>

              <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-slate-800 hover:bg-slate-950 px-2 py-1 text-sm text-white rounded-md mx-1 font-bold cursor-pointer '><FaEdit /></button>
                <button onClick={(e)=>{handledelete(e,item.id)}} className='bg-slate-800 hover:bg-slate-950 px-2 py-1 text-sm text-white rounded-md mx-1 font-bold cursor-pointer'><MdDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
