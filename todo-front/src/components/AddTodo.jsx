import React from 'react'
import {TextField,Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {useState } from 'react';
import { postData } from '../Store/action';

const AddTodo = () => {
    const dispatch = useDispatch();
    const list = useSelector((state)=>state);
    const [todo,setTodo] = useState({});
    const handleSubmit = (e)=>{
      postData(todo,dispatch);
    }
    const handleChange = (e) => {
      let {name,value} = e.target;
      setTodo({...todo,isCompleted:false,[name]:value});
    }
  return (
    <div>
        <TextField name="title"  label="Add Title" variant="standard" fullWidth onChange={handleChange} />
        <TextField name="content" label="Add Description" variant="standard" fullWidth onChange={handleChange} />
        <Button onClick={handleSubmit}>Add</Button>
    </div>
  )
}

export default AddTodo;