import React, { useState } from 'react';
import {TextField,Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { postData } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

export const AddTodo = () => {
    const [todo,setTodo] = useState({});
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
    <div>
        <TextField name="title" label="Add Title" onChange={handleChange}/>
        <TextField name="content" label="Add Description" onChange={handleChange}/>
        <Fab disabled={loading} color="primary" onClick={handleSubmit}>
            {loading?<CircularProgress />:<AddIcon />}
        </Fab>
    </div>
  )
}
