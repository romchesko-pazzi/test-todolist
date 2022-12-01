import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { TasksList } from '../pages/tasksList/TasksList';
import { TodolistsList } from '../pages/todolistsList/TodolistsList';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TodolistsList />} />
      <Route path="/tasksList" element={<TasksList />} />
    </Routes>
  );
};
