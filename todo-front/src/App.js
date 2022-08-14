import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import OneTodo from './components/OneTodo';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div style={{width:'79%',margin:'auto'}}>
      <Routes>
        <Route path="/" element={<><AddTodo/>
      <TodoList/></>}/>
        <Route path="/:id" element={<OneTodo/>}/>
      </Routes>
    </div>
  );
}

export default App;
