import React, { useContext } from 'react';
import {Box, Button, List, ListItem, ListItemButton, ListItemText, Checkbox} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {todosActions} from '../state/actions';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import { SnackBarContext } from '../../Common/Contexts/Snackbar';

const TodoList = (props)=>{
    const {snackbar, setSnackbar} = useContext(SnackBarContext);
    let list =  useSelector((state)=>state.todo.todo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state)=>state.todo.isLoading);
    const { open, msg} = snackbar;
    const handleOpenSnackbar = (msg) => {
        setSnackbar({open: true, msg})
    }
    const handleCloseSnackbar = (msg) => {
        setSnackbar({open: false, msg: ""})
    }
    const handleDelete = (id)=>{
        setSnackbar({open: true, msg: "Deleted the todo"});
        dispatch(todosActions.deleteData(id));
    }
    const handleComplete = (ev,id)=>{
        setSnackbar({open: true, msg: "Marked as Complete!"});
        dispatch(todosActions.patchData(id,{isCompleted:true}))
    }
    React.useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(todosActions.getData(user.token));
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
            {/* <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: 'center' }}
                open={open}
                onClose={handleCloseSnackbar}
                message={msg}
            /> */}
        </Box>
    )
}

export default TodoList;