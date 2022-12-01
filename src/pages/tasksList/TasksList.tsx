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
  const [modalActive, setModalActive] = useState(false);
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

  const queueTasks = tasks.filter(f => f.status === 'queue');
  const devTasks = tasks.filter(f => f.status === 'development');
  const doneTasks = tasks.filter(f => f.status === 'done');

  const [boards, setBoards] = useState<LocalBoardsType[]>([
    { id: 1, title: 'queue', items: queueTasks },
    { id: 2, title: 'development', items: devTasks },
    { id: 3, title: 'done', items: doneTasks },
  ]);

  const [currentBoard, setCurrentBoard] = useState(currentBoardInit);
  const [currentTask, setCurrentTask] = useState<TaskType>(currentTaskInit);

  // сетаем в ЛС таски

  const openModal = () => setModalActive(true);

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  };
  const dragStartHandler = (e: any, board: any, item: TaskType) => {
    setCurrentTask(item);
    setCurrentBoard(board);
  };
  const dragLeaveHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };
  const dragEndHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const dropHandler = (e: any, board: any, item: TaskType) => {
    e.preventDefault();
    // получаем индекс задачи которую держим в руке
    const currentIndex = currentBoard.items.indexOf(currentTask);

    // удаляем задачу которую держим в руке из старой доски
    currentBoard.items.splice(currentIndex, 1);

    // получаем индекс задачи над которой держим старую задачу
    const dropIndex = board.items.indexOf(item);

    // вставляем в массив новую задачу
    board.items.splice(dropIndex + 1, 0, currentTask);
    setBoards(
      boards.map(b => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      }),
    );
    e.target.style.boxShadow = 'none';
  };

  const dropCardHandler = (e: any, board: any) => {
    board.items.push(currentTask);
    const currentIndex = currentBoard.items.indexOf(currentTask);

    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map(b => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      }),
    );
    e.target.style.boxShadow = 'none';
  };

  // console.log(tasks);

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
            onDrop={e => dropCardHandler(e, board)}
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
                onDrop={e => dropHandler(e, board, item)}
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
                  elapsedTime={item.elapsedTime}
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

type LocalBoardsType = {
  id: number;
  title: 'queue' | 'development' | 'done';
  items: TaskType[];
};
