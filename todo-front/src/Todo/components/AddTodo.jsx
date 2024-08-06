import React, { useContext } from 'react';
import {Box, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {todosActions} from '../state/actions'; 
import Snackbar from '@mui/material/Snackbar';
import { SnackBarContext } from '../../Common/Contexts/Snackbar';

const AddTodo = (props)=>{
    const {snackbar, setSnackbar} = useContext(SnackBarContext);
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
        try {
            // todo.userId = user.userId;
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch(todosActions.postData(todo,user.token));
            setSnackbar({open: true, msg: "Added Todo"});
        }
        catch(err){
            setSnackbar({open: true, msg: "Error in adding todo"});
        }
    }

    return (
        <Box sx={{
            display: {xs: "block",md: "flex"},
            justifyContent:"space-around",
        }}>
            <TextField name="title" label="Add Title" sx={{
                width:"40ch"
            }} onChange={handleChange}/>
            <TextField name="content" multiline rows={{xs:4,md:1}} label="Add Description" sx={{
                width: {xs: "40ch", md: "100ch"},
                marginTop: {xs: "15px", md: "0px"}
            }} onChange={handleChange}/>
            <Fab color="primary" onClick={handleSubmit} disabled={loading} sx={{
                marginTop: {xs: "15px", md: "0px"}
            }}>
                <AddIcon />
            </Fab>
        </Box>
    )
}

export default AddTodo;