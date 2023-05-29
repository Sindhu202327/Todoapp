import { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import db from "./firebase_config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useEffect } from 'react';
import { query, where, getDocs } from "firebase/firestore";
import Todo from './Todo.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const q = query(collection(db, "todos"));
  const dbRef = collection(db, "todos");

  useEffect(() => {
    getTodos();
  }, [])

  async function getTodos (){
    const querySnapshot = await getDocs(q);
    let todoList = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data(), doc.id);
      todoList.push(
        {
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }
      );
   })
   console.log(todoList);
    setTodos(
     todoList
    );
    console.log('hello', todos)
  }

  const addTodo = (e) => {
    e.preventDefault();
    const data = {
      inprogress: true,
      timestamp: serverTimestamp(),
      todo: todoInput
   };
   addDoc(dbRef, data)
    .then(docRef => {
        console.log("Document has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    // addDoc(collection(db, "todos"), {
    //   inprogress: false,
    //   timestamp: serverTimestamp(),
    //   todo: todoInput
    // });
    setTodoInput('');
  }

  return (
    <div className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
    >
      <div>
        <h1>Sindhu Todo's App</h1>
        <form>
          <TextField  id="standard-basic" 
                      label="Write a Todo" 
                      value={todoInput} 
                      onChange={(e) => {
                        setTodoInput(e.target.value);
                      }} 
                      variant="standard"
                      style={{maxWidth : "300px", width: "90vw"}} 
          />
          <Button type="submit" onClick={addTodo} style={{display: "none"}}>Text</Button>
        </form>

        {todos && todos.map((todo, index) => (
          <Todo key={index+1} todo={todo.todo} inprogress={todo.inprogress} id={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
