import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { BoardsList } from '../pages/boardsList/BoardsList';
import { TasksList } from '../pages/tasksList/TasksList';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BoardsList />} />
      <Route path="/tasksList" element={<TasksList />} />
    </Routes>
  );
};
