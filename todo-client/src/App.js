import React from 'react';
import {AddTodo} from './components/AddTodo';
import {TodoList} from './components/TodoList';
import {Routes,Route} from 'react-router-dom';
import {OneTodo} from './components/OneTodo';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><AddTodo/>
      <TodoList/></>}/>
        <Route path="/:id" element={<OneTodo/>}/>
      </Routes>
    </div>
  );
}

export default App;
