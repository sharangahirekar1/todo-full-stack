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
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from '../Account/components/ForgotPassword';
import GenAi from '../GenAI/GenAi';

function App() {
  const location = useLocation();
  return (
    <div style={{
      backgroundColor:location.pathname == "/"?"white":"#ADD8E6",
      width: '100%'
    }}>
      <NavBar/>
      <div style={{
        paddingTop:"100px",
        height:"84vh",
        widht: "100%"
      }}>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path="/:id" element={<PrivateRoute><OneTodo/></PrivateRoute>}/>
        <Route path="/gen-ai" element={<PrivateRoute><GenAi/></PrivateRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
      </div>
    </div>
  );
}

export {App};


const Home = (props)=>{
  const state = React.useState({
      open: false,
      msg: ""
  })
  return (
    <div>
      <AddTodo state={state}/>
      <TodoList state={state}/>
    </div>
  )
}
