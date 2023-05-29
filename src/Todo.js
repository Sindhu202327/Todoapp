import React from 'react'
import './Todo.css'; 
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import db from "./firebase_config";
import {doc, updateDoc, deleteDoc   } from "firebase/firestore"; 

function Todo({todo, inprogress, id}) {
    
    const docRef = doc(db, "todos", id);

    function toggleInProgress(){
        const data = {
            inprogress: !inprogress
        };
        updateDoc(docRef, data)
        .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
        })
        .catch(error => {
            console.log(error);
        })
    }

    function deleteTodo(){
        deleteDoc(docRef)
        .then(() => {
            console.log("Entire Document has been deleted successfully.")
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div style={{display: 'flex'}}>
            <ListItem>
                <ListItemText primary={todo} secondary={inprogress ? "In Progress" : "Completed"} />
            </ListItem>
            <Button onClick={toggleInProgress}>{inprogress ? "Done" : "UnDone"}</Button>
            <Button onClick={deleteTodo}>X</Button>
        </div>
    )
}

export default Todo
