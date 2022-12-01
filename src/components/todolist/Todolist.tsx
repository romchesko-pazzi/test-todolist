import React from 'react';

import { useNavigate } from 'react-router-dom';

import s from './todolist.module.scss';

export const Todolist: React.FC<PropsType> = props => {
  const { todolistId, title } = props;
  const navigate = useNavigate();

  const navigateToTasksPage = () => {
    navigate('/tasksList', {
      state: {
        todolistId,
      },
    });
  };

  return (
    <div className={s.box}>
      <div className={s.todolist} onClick={navigateToTasksPage}>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

type PropsType = {
  title: string;
  todolistId: string;
};
