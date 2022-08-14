import { Button, List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteData, getData, patchData } from '../store/action';
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

export const TodoList = () => {
    const list = useSelector((state)=>state.todo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.isLoading);
    const handleDelete = (id)=>{
        dispatch(deleteData(id));
    }
    const handleCompleted = (id)=>{

        dispatch(patchData(id,{isCompleted:true}));
    }
    useEffect(()=>{
        dispatch(getData());
    },[])
  return (
    <div>
        {loading && <LinearProgress/>}
        {!loading && <List>
            {list.map((t)=><ListItem key={t._id}>
                <Button onClick={()=>handleDelete(t._id)}><DeleteOutlineIcon/></Button>
                <ListItemButton onClick={()=>navigate(`/${t._id}`)}>
                    <ListItemText>{t.title}</ListItemText>
                </ListItemButton>
                <Checkbox onChange={()=>handleCompleted(t._id)} checked={t.isCompleted}/>

            </ListItem>)}
        </List>}
    </div>
  )
}
