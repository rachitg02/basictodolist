import React, {useState, useRef, useEffect } from "react";
import Todolist from "./components/Todolist";
import {v4 as uuidv4} from 'uuid'

const L_S_K= 'todoApp.todos';

function App() {
  const [todos,setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(L_S_K));
    if(storedTodos) setTodos(storedTodos);
  }, []);
  
  useEffect(()=>{
    localStorage.setItem(L_S_K, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id){
    const newTodos =[...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete =!todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
  <>
      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodo}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </>
  );
}

export default App;
