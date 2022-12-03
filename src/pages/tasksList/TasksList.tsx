import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { AddTaskModal } from '../../components/modals/addTaskModal/AddTaskModal';
import { Task } from '../../components/task/Task';
import { setTasks, TaskType } from '../../context/tasksReducer/TasksReducer';
import { setTodolists } from '../../context/todolistReducer.ts/TodolistReducer';
import { currentBoardInit, currentTaskInit } from '../../data/constants/testData';
import { useAppSelector } from '../../utils/hooks/typedUseSelector';

import './tasksList.scss';
import s from './tasksList.module.scss';

export const TasksList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { todolistId } = location.state as { todolistId: string };
  const tasks = useAppSelector(state => state.tasks[todolistId]);
  const todolists = useAppSelector(state => state.todolists);

  useEffect(() => {
    const todolistsFromLS = localStorage.getItem('todolists');

    if (todolistsFromLS) {
      const parsedTodolists = JSON.parse(todolistsFromLS);

      if (todolists.length < 1) dispatch(setTodolists(parsedTodolists));
    }
  }, []);
  useEffect(() => {
    const tasksFromLS = localStorage.getItem('tasks');

    if (tasksFromLS) {
      const parsedTasks = JSON.parse(tasksFromLS);
      const filtered = parsedTasks.filter((f: TaskType) => f.todolistId === todolistId);

      if (tasks.length < 1) dispatch(setTasks(todolistId, filtered));
    }
  }, []);
  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks));
    setBoards([
      { id: 1, title: 'queue', items: queueTasks },
      { id: 2, title: 'development', items: devTasks },
      { id: 3, title: 'done', items: doneTasks },
    ]);
  }, [tasks]);

  // filter tasks from store
  const queueTasks = tasks.filter(f => f.status === 'queue');
  const devTasks = tasks.filter(f => f.status === 'development');
  const doneTasks = tasks.filter(f => f.status === 'done');

  // local state
  const [boards, setBoards] = useState<LocalBoardType[]>([
    { id: 1, title: 'queue', items: queueTasks },
    { id: 2, title: 'development', items: devTasks },
    { id: 3, title: 'done', items: doneTasks },
  ]);
  const [startBoard, setStartBoard] = useState<LocalBoardType>(currentBoardInit);
  const [currentTask, setCurrentTask] = useState<TaskType>(currentTaskInit);
  const [modalActive, setModalActive] = useState(false);

  // handlers
  // срабатывает в тот момент когда взяли задачу
  const dragStartHandler = (e: any, sendingBoard: LocalBoardType, item: TaskType) => {
    setStartBoard(sendingBoard);
    setCurrentTask(item);
  };

  // объект-приёмник. Срабатывает когда находимся над объектом-приёмником
  const dragOverHandler = (e: any) => {
    e.preventDefault();
    // подсвечиваем элемент под который перемещаем задачу
    if (e.target.className === 'item') e.target.style.boxShadow = '0 4px 3px gray';
  };

  const dragLeaveHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  // срабатывает когда отпустили задачу
  const dragEndHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const dropToReceivingBoard = (e: any, receivingBoard: LocalBoardType) => {
    // пушим в принимающую доску
    receivingBoard.items.push(currentTask);

    // получаем индекс задачи которую держим в руке
    const currentIndex = startBoard.items.indexOf(currentTask);

    // удаляем задачу которую держим в руке из старой доски
    startBoard.items.splice(currentIndex, 1);

    // для ререндера, задачи запушили,удалили, теперь нужно засетать в local state
    setBoards(
      boards.map(b => {
        if (b.id === receivingBoard.id) {
          return receivingBoard;
        }
        if (b.id === startBoard.id) {
          return startBoard;
        }

        return b;
      }),
    );
    e.target.style.boxShadow = 'none';
  };

  const openModal = () => setModalActive(true);

  return (
    <div className={s.container}>
      <div className={s.headContent}>
        <Link className={s.returnToTodolists} to="/">
          <span>Back to boards list</span>
        </Link>
        <button type="button" onClick={openModal}>
          new
        </button>
      </div>
      <div className={s.flexContainer}>
        {boards.map(board => (
          <div
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropToReceivingBoard(e, board)}
            key={board.id}
            className="board"
          >
            <h3>{board.title}</h3>
            {board.items.map(item => (
              <div
                draggable
                onDragOver={e => dragOverHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragStart={e => dragStartHandler(e, board, item)}
                onDragEnd={e => dragEndHandler(e)}
                key={item.taskId}
                className="item"
              >
                <Task
                  key={item.taskId}
                  taskId={item.taskId}
                  taskTitle={item.taskTitle}
                  taskNumber={item.taskNumber}
                  description={item.description}
                  creationDate={item.creationDate}
                  timeSpent={item.timeSpent}
                  endDate={item.endDate}
                  priority={item.priority}
                  status={item.status}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <AddTaskModal
        todolistId={todolistId}
        switchModal={setModalActive}
        modalActive={modalActive}
      />
    </div>
  );
};

export type LocalBoardType = {
  id: number;
  title: 'queue' | 'development' | 'done';
  items: TaskType[];
};
