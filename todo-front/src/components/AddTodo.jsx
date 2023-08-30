import React from 'react';
import {Box, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {postData} from '../store/action'; 
import {v4 as uuid} from 'uuid';
import { addIn } from '../utils/indexedDB';
import { ping } from '../store/action';

// let res ;

const AddTodo = ()=>{
    const [todo,setTodo] = React.useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.isLoading);
    // console.log(navigator.onLine,'navigator online');
    // ping().then(()=>{res= true; console.log('res',true)})
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setTodo({...todo,isCompleted:false,[name]:value});
    }
    // const handleSubmit = ()=>{
    //     let item = {...todo,id:uuid()};
    //     if(res){
    //         addIn(item);
    //     } else dispatch(postData(item));
    // }
    const handleExpand = (ev)=>{
        console.log(ev,'key down')
        if(ev.key == "Enter"){
            console.log("Enter pressed")
        }
    }
    const handleSubmit = ()=>{
        console.log(todo)
        dispatch(postData(todo))
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
            }} onChange={handleChange} onKeyDown={handleExpand}/>
        {/**<textarea onChange={handleChange}/>**/}
            <Fab color="primary" onClick={handleSubmit} disabled={loading}>
                <AddIcon />
            </Fab>
        </Box>
    )
}

export default AddTodo;