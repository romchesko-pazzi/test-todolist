import React from 'react';

import { useNavigate } from 'react-router-dom';

import s from './board.module.scss';

export const Board: React.FC<PropsType> = props => {
  const { boardId, title } = props;
  const navigate = useNavigate();

  const navigateToTasksPage = () => {
    navigate('/tasksList', {
      state: {
        boardId,
      },
    });
  };

  return (
    <div className={s.box}>
      <div className={s.board} onClick={navigateToTasksPage}>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

type PropsType = {
  title: string;
  boardId: string;
};
