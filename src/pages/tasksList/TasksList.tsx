import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { AddTaskModal } from '../../components/modals/addTaskModal/AddTaskModal';
import { Task } from '../../components/task/Task';
import {
  BoardType,
  changeTaskStatus,
  setTasks,
  TaskType,
} from '../../context/tasksReducer/TasksReducer';
import { currentBoardInit, currentTaskInit } from '../../data/constants/testData';
import { useAppSelector } from '../../utils/hooks/typedUseSelector';

import './tasksList.scss';
import s from './tasksList.module.scss';

export const TasksList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { todolistId } = location.state as { todolistId: string };
  const tasks = useAppSelector(state => state.tasks[todolistId]) || [];

  const queueTasks = tasks.filter(f => f.status === 'queue');
  const devTasks = tasks.filter(f => f.status === 'development');
  const doneTasks = tasks.filter(f => f.status === 'done');

  // local state
  const [boards, setBoards] = useState<BoardType[]>([
    { boardId: 1, filter: 'queue', tasks: queueTasks },
    { boardId: 2, filter: 'development', tasks: devTasks },
    { boardId: 3, filter: 'done', tasks: doneTasks },
  ]);
  const [startBoard, setStartBoard] = useState<BoardType>(currentBoardInit);
  const [currentTask, setCurrentTask] = useState<TaskType>(currentTaskInit);
  const [modalActive, setModalActive] = useState(false);

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
      { boardId: 1, filter: 'queue', tasks: queueTasks },
      { boardId: 2, filter: 'development', tasks: devTasks },
      { boardId: 3, filter: 'done', tasks: doneTasks },
    ]);
  }, [tasks]);

  // handlers
  const dragStartHandler = (e: any, sendingBoard: BoardType, item: TaskType) => {
    setStartBoard(sendingBoard);
    setCurrentTask(item);
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    // подсвечиваем элемент под который перемещаем задачу
    if (e.target.className === 'item') e.target.style.boxShadow = '0 4px 3px gray';
  };

  const dragLeaveHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const dragEndHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const dropToReceivingBoard = (e: any, receivingBoard: BoardType) => {
    // пушим в принимающую доску
    receivingBoard.tasks.push(currentTask);

    // получаем индекс задачи которую держим в руке
    const currentIndex = startBoard.tasks.indexOf(currentTask);

    // удаляем задачу которую держим в руке из старой доски
    startBoard.tasks.splice(currentIndex, 1);

    dispatch(changeTaskStatus(currentTask, receivingBoard.filter));

    // для ререндера, задачи запушили,удалили, теперь нужно засетать в local state
    setBoards(
      boards.map(b => {
        if (b.boardId === receivingBoard.boardId) {
          return receivingBoard;
        }
        if (b.boardId === startBoard.boardId) {
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
            key={board.boardId}
            className="board"
          >
            <h3>{board.filter}</h3>
            {board.tasks.map(item => (
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
