import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

const OneTodo = ()=>{
    const {id} = useParams();
    const list = useSelector((state)=>state.todo);
    const todo = list.find((t)=>t._id === id);
    return (
        <div>
            <h2>{todo.title && todo.title}</h2>
            <div>{todo.content && todo.content}</div>
        </div>
    )
}

export default OneTodo;