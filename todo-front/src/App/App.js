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
import Todo from '../Todo/Todo';
import ConverterCSVJSON from '../csv2json/csv2json';
import Chat from '../Chat/Chat';

function App() {
  const location = useLocation();
  return (
    <div style={{
      backgroundColor:location.pathname == "/"?"white":"#ADD8E6",
      width: '100%'
    }}>
      <NavBar/>
      <main style={{
        paddingTop:"100px",
        height:"84vh",
        widht: "100%"
      }}>
      <Routes>
        <Route path="/" element={<PrivateRoute><Todo/></PrivateRoute>}/>
        <Route path="/:id" element={<PrivateRoute><OneTodo/></PrivateRoute>}/>
        <Route path="/gen-ai" element={<PrivateRoute><GenAi/></PrivateRoute>}/>
        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/csv2json" element={<ConverterCSVJSON/>}/>
      </Routes>
      </main>
    </div>
  );
}

export {App};

