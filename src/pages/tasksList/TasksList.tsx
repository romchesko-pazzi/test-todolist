import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { AddTaskModal } from '../../components/modals/addTaskModal/AddTaskModal';
import { Task } from '../../components/task/Task';
import { setTasks, TaskType } from '../../context/tasksReducer/TasksReducer';
import { useAppSelector } from '../../utils/hooks/typedUseSelector';

import s from './tasksList.module.scss';

export const TasksList = () => {
  const [modalActive, setModalActive] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { boardId } = location.state as { boardId: string };
  const tasks = useAppSelector(state => state.tasks[boardId]);

  useEffect(() => {
    const tasksFromLS = localStorage.getItem('tasks');

    if (tasksFromLS) {
      const parsedTasks = JSON.parse(tasksFromLS);
      const filtered = parsedTasks.filter((f: TaskType) => f.boardId === boardId);

      if (tasks.length < 1) dispatch(setTasks(boardId, filtered));
    }
  }, []);

  // сетаем в ЛС таски
  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openModal = () => setModalActive(true);

  console.log(boardId);

  return (
    <div className={s.container}>
      <div className={s.headContent}>
        <Link className={s.returnToBoards} to="/">
          <span>Back to boards list</span>
        </Link>
        <button type="button" onClick={openModal}>
          new
        </button>
      </div>
      <div className={s.flexContainer}>
        <div className={s.column}>
          <h3>Queue</h3>
          <div className={s.tasks}>
            {tasks.map(m => (
              <Task
                key={m.taskId}
                taskId={m.taskId}
                taskTitle={m.taskTitle}
                taskNumber={m.taskNumber}
                description={m.description}
                creationDate={m.creationDate}
                elapsedTime={m.elapsedTime}
                endDate={m.endDate}
                priority={m.priority}
                status={m.status}
              />
            ))}
          </div>
          {/* // <div key={m.taskId} className={s.tasks}> */}
          {/* //   <div className={s.heading}> */}
          {/* //     <div className={s.taskNumber}>{m.taskNumber}</div> */}
          {/* //     <div className={s.taskTitle}>{m.taskTitle}</div> */}
          {/* //   </div> */}
          {/* //   <div className={s.taskTitle}>{m.description}</div> */}
          {/* //   <div className={s.date}> */}
          {/* //     <div>{m.creationDate}</div> */}
          {/* //     <div>{m.elapsedTime}</div> */}
          {/* //     <div>{m.endDate}</div> */}
          {/* //   </div> */}
          {/* //   <div className={s.statuses}> */}
          {/* //     <div>{m.priority}</div> */}
          {/* //     <div>files</div> */}
          {/* //     <div>{m.status}</div> */}
          {/* //   </div> */}
          {/* // </div> */}
        </div>
        <div className={s.column}>
          <h3>Development</h3>
          <div className={s.tasks}>
            <div className={s.heading}>
              <div className={s.taskNumber}>#1.</div>
              <div className={s.taskTitle}>#taskTitle</div>
            </div>
            <div className={s.taskTitle}>#описание</div>
            <div className={s.date}>
              <div>#дата создания</div>
              <div>#время работы (вносится юзером)</div>
              <div>#дедлайн</div>
            </div>
            <div className={s.statuses}>
              <div>#приоритет</div>
              <div>#вложенные файлы</div>
              <div>#статус</div>
            </div>
          </div>
        </div>
        <div className={s.column}>
          <h3>Done</h3>
          <div className={s.tasks}>
            <div className={s.heading}>
              <div className={s.taskNumber}>#1.</div>
              <div className={s.taskTitle}>#taskTitle</div>
            </div>
            <div className={s.taskTitle}>#описание</div>
            <div className={s.date}>
              <div>#дата создания</div>
              <div>#время работы (вносится юзером)</div>
              <div>#дедлайн</div>
            </div>
            <div className={s.statuses}>
              <div>#приоритет</div>
              <div>#вложенные файлы</div>
              <div>#статус</div>
            </div>
          </div>
        </div>
      </div>
      <AddTaskModal
        boardId={boardId}
        switchModal={setModalActive}
        modalActive={modalActive}
      />
    </div>
  );
};
