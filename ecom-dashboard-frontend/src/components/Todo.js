import { IconButton, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";
import { useContext } from "react";

const Todo = ({ id, timestamp, title, detail }) => {
    const { showAlert } = useContext(TodoContext)
    const deleteTodo = async (id, e) => {
        e.stopPropagation();
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef);
        showAlert('error', `Todo with id ${id} deleted successfully`);
    }
    return (
        <ListItem 
            sx={{ mt:3,boxShadow: 3 }} 
            style={{ backgroundColor:'#FAFAFA' }} 
            secondaryAction={
                <>
                    <IconButton onClick={e => deleteTodo(id, e)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </>
            }
        >
            <ListItemText 
                primary={title} 
                secondary={moment(timestamp).format("MMMM dd,yyyy")} 
            />
        </ListItem>
    )
}
export default Todo