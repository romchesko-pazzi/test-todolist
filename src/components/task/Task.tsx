import React, { useState } from 'react';

import { BaseModal } from '../modals/baseModal/BaseModal';

import s from './task.module.scss';

export const Task: React.FC<TaskPropsType> = props => {
  const [modalActive, setModalActive] = useState(false);

  const {
    taskId,
    taskTitle,
    taskNumber,
    description,
    creationDate,
    timeSpent,
    endDate,
    priority,
    status,
  } = props;

  const openModal = () => setModalActive(!modalActive);

  const convertedEndDate = new Date(endDate).toLocaleDateString('ru');

  return (
    <div className={s.task} onClick={openModal}>
      <div className={s.taskTitle}>
        <div>{taskNumber}</div>
        <div>{taskTitle}</div>
      </div>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={s.modalContent}>
          <h3>{`${taskNumber}. ${taskTitle}`}</h3>
          <div className={s.description}>Description: {description}</div>
          <div className={s.creationDate}>Date created: {creationDate}</div>
          <div className={s.timeSpent}>Time spent: {timeSpent}</div>
          <div className={s.deadline}>Deadline: {convertedEndDate}</div>
          <div className={s.priority}>Priority: {priority}</div>
          <div className={s.status}>Status: {status}</div>
        </div>
      </BaseModal>
    </div>
  );
};

export type TaskPropsType = {
  taskId: string;
  taskTitle: string;
  taskNumber: string;
  description: string;
  creationDate: string;
  timeSpent: string;
  endDate: string;
  priority: string;
  status: string;
};
