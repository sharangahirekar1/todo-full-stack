import React from 'react';
import {Box, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {postData} from '../store/action'; 

const AddTodo = ()=>{
    const [todo,setTodo] = React.useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.isLoading);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setTodo({...todo,isCompleted:false,[name]:value});
    }
    const handleSubmit = ()=>{
        dispatch(postData(todo));
    }
    return (
        <Box>
            <TextField name="title" label="Add Title" onChange={handleChange}/>
            <TextField name="content" label="Add Description" onChange={handleChange}/>
            <Fab color="primary" onClick={handleSubmit} disabled={loading}>
                <AddIcon />
            </Fab>
        </Box>
    )
}

export default AddTodo;