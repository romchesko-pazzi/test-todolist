import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Board } from '../../components/board/Board';
import { BaseModal } from '../../components/modals/baseModal/BaseModal';
import { createBoard, setBoards } from '../../context/boardsReducer/boardsReducer';
import { guid } from '../../utils/functions/generateRandomId/guid';
import { useAppSelector } from '../../utils/hooks/typedUseSelector';

import s from './boardsList.module.scss';

export const BoardsList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [titleValue, setTitleValue] = useState<string>('');
  const dispatch = useDispatch();
  const boards = useAppSelector(state => state.boards);

  useEffect(() => {
    const boardsAsString = localStorage.getItem('boards');

    if (boardsAsString) {
      const parsedBoards = JSON.parse(boardsAsString);

      if (boards.length < 1) dispatch(setBoards(parsedBoards));
    }
  }, []);

  useEffect(() => {
    if (boards.length > 0) localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  const openModal = () => setModalActive(true);
  const boardTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  };
  const createBoardHandler = () => {
    setModalActive(false);
    setTitleValue('');
    dispatch(createBoard({ title: titleValue, boardId: guid() }));
  };

  return (
    <div className={s.container}>
      <div className={s.addBoard}>
        <button onClick={openModal} type="button">
          add new board
        </button>
      </div>
      {boards.map(m => (
        <Board key={m.boardId} title={m.title} boardId={m.boardId} />
      ))}
      <BaseModal active={modalActive} setActive={setModalActive}>
        Enter board name
        <input type="text" value={titleValue} onChange={boardTitleHandler} />
        <button type="button" onClick={createBoardHandler}>
          create
        </button>
      </BaseModal>
    </div>
  );
};
