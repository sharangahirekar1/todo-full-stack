import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OneTodo = () => {
  const list = useSelector((state)=>state.todo);
  const {id} = useParams();
  const todo = list.find((t)=>t._id == id);
  return (
    <div>
        <h4>{todo.title && todo.title}</h4>
        <div>{todo.content && todo.content}</div>
    </div>
  )
}

export default OneTodo;