import React from 'react';
import {Box, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../state/actions'; 

const AddTodo = ()=>{
    const [todo,setTodo] = React.useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.isLoading);
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setTodo({...todo,isCompleted:false,[name]:value});
    }
    const handleSubmit = ()=>{
        console.log(todo)
        dispatch(actions.postData(todo))
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
        </Box>
    )
}

export default AddTodo;