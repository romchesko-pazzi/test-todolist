import React from 'react';

import s from './task.module.scss';

export const Task: React.FC<TaskPropsType> = props => {
  const {
    taskId,
    taskTitle,
    taskNumber,
    description,
    creationDate,
    elapsedTime,
    endDate,
    priority,
    status,
  } = props;

  return (
    <>
      <div className={s.taskNumber}>{taskNumber}.</div>
      <div className={s.taskTitle}>{taskTitle}</div>
    </>
  );
};

export type TaskPropsType = {
  taskId: string;
  taskTitle: string;
  taskNumber: string;
  description: string;
  creationDate: string;
  elapsedTime: string;
  endDate: string;
  priority: string;
  status: string;
};
