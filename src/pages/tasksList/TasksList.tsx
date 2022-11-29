import React from 'react';

import { Link } from 'react-router-dom';

import s from './tasksList.module.scss';

export const TasksList = () => {
  return (
    <div className={s.container}>
      <Link className={s.returnToBoards} to="/">
        <span>Back to pack list</span>
      </Link>
      <div className={s.flexContainer}>
        <div className={s.column}>
          <h3>Queue</h3>
          <div className={s.task}>
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
          <h3>Development</h3>
          <div className={s.task}>
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
          <div className={s.task}>
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
    </div>
  );
};
