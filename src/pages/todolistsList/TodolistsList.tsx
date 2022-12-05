import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { BaseModal } from '../../components/modals/baseModal/BaseModal';
import { Todolist } from '../../components/todolist/Todolist';
import {
  createTodolist,
  setTodolists,
} from '../../context/todolistReducer.ts/TodolistReducer';
import { buttonFields, todolistFields } from '../../data/constants/fields';
import { guid } from '../../utils/functions/generateRandomId/guid';
import { useAppSelector } from '../../utils/hooks/typedUseSelector';

import s from './todoList.module.scss';

export const TodolistsList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [titleValue, setTitleValue] = useState<string>('');
  const dispatch = useDispatch();
  const todolists = useAppSelector(state => state.todolists);

  useEffect(() => {
    const todolistsFromLS = localStorage.getItem('todolists');

    if (todolistsFromLS) {
      const parsedTodolists = JSON.parse(todolistsFromLS);

      if (todolists.length < 1) dispatch(setTodolists(parsedTodolists));
    }
  }, []);

  useEffect(() => {
    if (todolists.length > 0)
      localStorage.setItem('todolists', JSON.stringify(todolists));
  }, [todolists]);

  const openModal = () => setModalActive(true);
  const todolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  };
  const createTodolistHandler = () => {
    setModalActive(false);
    setTitleValue('');
    dispatch(createTodolist({ title: titleValue, todolistId: guid() }));
  };

  return (
    <div className={s.container}>
      <div className={s.addTodolist}>
        <button onClick={openModal} type="button">
          {buttonFields.addNewTodolistBtn}
        </button>
      </div>
      {todolists.map(m => (
        <Todolist key={m.todolistId} title={m.title} todolistId={m.todolistId} />
      ))}
      <BaseModal active={modalActive} setActive={setModalActive}>
        <span style={{ marginRight: '1rem' }}>{todolistFields.todolistName}</span>
        <input type="text" value={titleValue} onChange={todolistTitleHandler} />
        <button type="button" onClick={createTodolistHandler}>
          {buttonFields.createBtn}
        </button>
      </BaseModal>
    </div>
  );
};
