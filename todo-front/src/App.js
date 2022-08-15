import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import OneTodo from './components/OneTodo';
import Login from './components/Login';

function App() {
  return (
    <div>
      <NavBar/>
      <div style={{marginTop:"100px"}}>
      <Routes>
        <Route path="/" element={<>
          <AddTodo/>
          <TodoList/>
        </>}/>
        <Route path="/:id" element={<OneTodo/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
