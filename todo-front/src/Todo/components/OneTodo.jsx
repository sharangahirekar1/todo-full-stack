import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Chip from '@mui/material/Chip';

const OneTodo = ()=>{
    const {id} = useParams();
    const list = useSelector((state)=>state.todo.todo);
    const todo = list.find((t)=>t._id === id);
    // console.log("todo" + " : ", todo);
    return (
        <div>
            <div style={{
                backgroundColor: "white",
                marginLeft: "10px",
                marginRight:"10px",
                borderRadius: "20px",
                paddingTop:"1%",
                paddingBottom:"1%",
                display: "flex",
                justifyContent: "space-between"

            }}>
                <h2 style={{
                paddingLeft: "15px",
                paddingRight: "15px",
            }}>{todo.title && todo.title}</h2>
                <div><Chip label={todo.isCompleted ? "Completed":"Pending"} color={todo.isCompleted ? "success" : "primary"} /></div>
            </div>
            <div style={{
                backgroundColor: "white",
                marginTop: "10px",
                marginLeft: "10px",
                marginRight:"10px",
                borderRadius: "20px",
                paddingTop:"1%",
                paddingLeft: "15px",
                paddingBottom:"1%",
                height: "60vh",

            }}>{todo.content && todo.content}</div>
        </div>
    )
}

export default OneTodo;