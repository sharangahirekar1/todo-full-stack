import React from 'react';
import {Box, Button, List, ListItem, ListItemButton, ListItemText, Checkbox} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {todosActions} from '../state/actions';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

const TodoList = ()=>{
    let list =  useSelector((state)=>state.todo.todo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state)=>state.todo.isLoading);
    const handleDelete = (id)=>{
        dispatch(todosActions.deleteData(id));
    }
    const handleComplete = (ev,id)=>{
        console.log(ev)
        dispatch(todosActions.patchData(id,{isCompleted:true}))
    }
    React.useEffect(()=>{
        dispatch(todosActions.getData());
    },[dispatch])
    return (
        <Box>
            {loading && <LinearProgress/>}
            {!loading && <List>
                {list.map((t)=><ListItem key={t._id}>
                    <Button key={t._id} onClick={()=>handleDelete(t._id)}>
                        <DeleteOutlineIcon/>
                    </Button>
                    <ListItemButton onClick={()=>navigate(`/${t._id}`)}>
                        <ListItemText sx={{
                            textDecoration:t.isCompleted? "line-through":"none"
                        }}>{t.title && t.title}</ListItemText>
                    </ListItemButton>
                    <Checkbox onChange={(ev)=>handleComplete(ev,t._id)} checked={t.isCompleted}/>
                </ListItem>)}
            </List>}
        </Box>
    )
}

export default TodoList;