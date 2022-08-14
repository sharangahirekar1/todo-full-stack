import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Button, Checkbox, List,ListItem, ListItemButton, ListItemText} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { getData, deleteData, patchData } from '../Store/action';

const TodoList = () => {
    const list = useSelector((state)=>state.todo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = (_id)=>{
        deleteData(_id,dispatch)
    }
    const handleComplete = (todo)=>{
        const data = {isCompleted:true}
        patchData(data,todo._id,dispatch);
    }
    useEffect(()=>{
        getData(dispatch);
    },[])
  return (
    <div>
        <List>
            {list.map((t)=><ListItem key={t._id} secondaryAction={<Checkbox key={t._id} onChange={()=>handleComplete(t)} checked={t.isCompleted}/>}>
                <Button onClick={()=>handleDelete(t._id)}><DeleteOutlinedIcon/></Button>
                <ListItemButton key={t._id} onClick={()=>navigate(`/${t._id}`)}>
                    <ListItemText key={t._id} id={t._id} primary={t.title}/>
                </ListItemButton>
            </ListItem>)}
        </List>
    </div>
  )
}

export default TodoList;