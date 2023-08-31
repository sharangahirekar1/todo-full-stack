import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import OneTodo from './components/OneTodo';
import Login from './components/Login';

function App() {
  return (
    <div style={{
      background:"#ADD8E6"
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
      </Routes>
      </div>
    </div>
  );
}

export default App;


const Home = (props)=>{
  return (
    <div>
      <AddTodo/>
      <TodoList/>
    </div>
  )
}
