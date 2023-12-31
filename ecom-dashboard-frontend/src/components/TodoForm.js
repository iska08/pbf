import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { Button, TextField } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";

const TodoForm=()=>{
    const inputAreaRef = useRef();
    const { showAlert, todo, setTodo } = useContext(TodoContext);
    const onSubmit = async () => {
        if (todo?.hasOwnProperty('timestamp')) {
            // Update the todo
            const docRef = doc(db, "todos", todo.id);
            const todoUpdate = {...todo, timestamp: serverTimestamp() }
            updateDoc(docRef, todoUpdate)
            setTodo({ title: '', detail: '' });
            showAlert('info', `Todo with id ${todo.id} updated successfully`)
        } else {
            const collectionRef = collection(db, "todos")
            const docRef = await addDoc(collectionRef, {...todo, timestamp: serverTimestamp() })
            setTodo({ title: '', detail: '' })
            showAlert('success', `Todo With id ${docRef.id} is added successfully`)
        }
    }
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (!inputAreaRef.current.contains(e.target)) {
                console.log('Outside input area');
                setTodo({ title: '', detail: '' })
            } else {
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    return(
        <div ref={inputAreaRef}>
            {/* <pre>{JSON.stringify(todo, null, '\t')}</pre> */}
            <TextField fullWidth label="tittle" margin="normal" 
                value={todo.title}
                onChange={e => setTodo({ ...todo, title: e.target.value })}
            />
            <TextField fullWidth label="detail" margin="normal" multiline maxRows={4} 
                value={todo.detail}
                onChange={e => setTodo({ ...todo, detail: e.target.value })}
            />
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>{todo.hasOwnProperty('timestamp')?'Update todo' : 'Add a new today'}</Button>
        </div>
    )
}
export default TodoForm;