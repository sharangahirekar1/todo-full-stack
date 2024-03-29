import React from 'react';
import AddTodo from '../Todo/components/AddTodo';
import TodoList from '../Todo/components/TodoList';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import OneTodo from '../Todo/components/OneTodo';
import Login from '../Account/components/Login';
import Signup from '../Account/components/Signup';
import { useLocation } from 'react-router-dom';
import Blog from '../Blog/Blog';

function App() {
  const location = useLocation();
  return (
    <div style={{
      background:location.pathname == "/"?"white":"#ADD8E6"
    }}>
      <NavBar/>
      <div style={{
        paddingTop:"100px",
        height:"84vh"
      }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<OneTodo/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
      </div>
    </div>
  );
}

export {App};


const Home = (props)=>{
  return (
    <div>
      <AddTodo/>
      <TodoList/>
    </div>
  )
}
