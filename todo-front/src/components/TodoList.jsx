import React from 'react';
import {Box, Button, List, ListItem, ListItemButton, ListItemText, Checkbox} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {getData, deleteData, patchData} from '../store/action';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

const TodoList = ()=>{
    const list = useSelector((state)=>state.todo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state)=>state.isLoading);

    const handleDelete = (id)=>{
        dispatch(deleteData(id));
    }
    const handleComplete = (id)=>{
        dispatch(patchData(id,{isCompleted:true}))
    }
    React.useEffect(()=>{
        dispatch(getData());
    },[])
    return (
        <Box>
            {loading && <LinearProgress/>}
            {!loading && <List>
                {list.map((t)=><ListItem key={t._id}>
                    <Button key={t._id} onClick={()=>handleDelete(t._id)}>
                        <DeleteOutlineIcon/>
                    </Button>
                    <ListItemButton onClick={()=>navigate(`/${t._id}`)}>
                        <ListItemText>{t.title && t.title}</ListItemText>
                    </ListItemButton>
                    <Checkbox onChange={()=>handleComplete(t._id)} checked={t.isCompleted}/>
                </ListItem>)}
            </List>}
        </Box>
    )
}

export default TodoList;