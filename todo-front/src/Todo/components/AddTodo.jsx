import React from 'react';
import {Box, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {todosActions} from '../state/actions'; 
import Snackbar from '@mui/material/Snackbar';

const AddTodo = (props)=>{
    const [snackbar, setSnackbar] = props.state;
    const { open, msg} = snackbar;
    const [todo,setTodo] = React.useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.todo.isLoading);
    const user = JSON.parse(localStorage.getItem("user"));
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setTodo({...todo,isCompleted:false,[name]:value});
    }
    const handleSubmit = ()=>{
        setSnackbar({open: true, msg: "Added Todo"});
        todo.userId = user.userId;
        dispatch(todosActions.postData(todo))
    }

    const handleCloseSnackbar = (msg) => {
        setSnackbar({open: false, msg: ""})
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent:"space-around",
        }}>
            <TextField name="title" label="Add Title" sx={{
                width:"40ch"
            }} onChange={handleChange}/>
            <TextField name="content" label="Add Description" sx={{
                width:"100ch"
            }} onChange={handleChange}/>
            <Fab color="primary" onClick={handleSubmit} disabled={loading}>
                <AddIcon />
            </Fab>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: 'center' }}
                open={open}
                onClose={handleCloseSnackbar}
                message={msg}
            />
        </Box>
    )
}

export default AddTodo;