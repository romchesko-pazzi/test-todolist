import React, { ChangeEvent, useState } from 'react';

import { BaseModal } from '../modals/baseModal/BaseModal';
import { SvgSelector } from '../svgSelector/SvgSelector';

import s from './task.module.scss';

export const Task: React.FC<TaskPropsType> = props => {
  const {
    taskId,
    taskTitle,
    description,
    creationDate,
    timeSpent,
    deadlineDate,
    priority,
    status,
  } = props;
  const [modalActive, setModalActive] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [localTaskTitle, setLocalTaskTitle] = useState(taskTitle);
  const [localDescription, setLocalDescription] = useState(description);
  const [localTimeSpent, setLocalTimeSpent] = useState(timeSpent);
  const [localDeadlineDate, setLocalDeadlineDate] = useState(deadlineDate);
  const [localPriority, setLocalPriority] = useState<PriorityType>(priority);
  const [localStatus, setLocalStatus] = useState<StatusType>(status);

  const openCloseModal = () => {
    setModalActive(!modalActive);
  };
  const switchToInputs = () => {
    setIsInput(true);
  };
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalTaskTitle(e.currentTarget.value);
  };
  const changeDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalDescription(e.currentTarget.value);
  };
  const changeTimeSpentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalTimeSpent(e.currentTarget.value);
  };
  const changeDeadlineDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalDeadlineDate(e.currentTarget.value);
  };
  const changePriorityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalPriority(e.currentTarget.value as PriorityType);
  };
  const changeStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalStatus(e.currentTarget.value as StatusType);
  };
  const saveChanges = () => {
    setIsInput(false);
  };

  let color = s.priorityLow;

  if (priority === 'medium') {
    color = s.priorityMedium;
  } else if (priority === 'high') {
    color = s.priorityHigh;
  }

  return (
    <div className={s.task} onClick={openCloseModal}>
      <div className={s.taskTitle}>
        <div>{taskTitle}</div>
        <div>{status}</div>
      </div>
      <div className={s.dateAndPriority}>
        <div>
          <div>Date created: {creationDate}</div>
          <div>Deadline: {deadlineDate}</div>
        </div>
        <div className={color}>{priority}</div>
      </div>
      <div className={s.description}>{description}</div>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={s.modalContent}>
          <div className={s.item}>
            <div className={s.taskHeading}>
              {isInput ? (
                <input value={localTaskTitle} onChange={changeTaskTitleHandler} />
              ) : (
                <span>{localTaskTitle}</span>
              )}
            </div>
          </div>
          <div className={s.item}>
            Description:
            {isInput ? (
              <textarea
                className={s.itemInput}
                value={localDescription}
                onChange={changeDescriptionHandler}
              />
            ) : (
              <span>{localDescription}</span>
            )}
          </div>
          <div className={s.item}>Date created: {creationDate}</div>
          <div className={s.item}>
            Time spent:
            {isInput ? (
              <input
                className={s.itemInput}
                value={localTimeSpent}
                onChange={changeTimeSpentHandler}
              />
            ) : (
              <span>{localTimeSpent}</span>
            )}
          </div>
          <div className={s.item}>
            Deadline:
            {isInput ? (
              <input
                className={s.itemInput}
                type="date"
                value={localDeadlineDate}
                onChange={changeDeadlineDateHandler}
              />
            ) : (
              <span>{localDeadlineDate}</span>
            )}
          </div>
          <div className={s.item}>
            Priority:
            {isInput ? (
              <select
                className={s.itemInput}
                value={localPriority}
                onChange={changePriorityHandler}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            ) : (
              <span>{localPriority}</span>
            )}
          </div>
          <div className={s.item}>
            Status:
            {isInput ? (
              <select
                className={s.itemInput}
                value={localStatus}
                onChange={changeStatusHandler}
              >
                <option value="queue">queue</option>
                <option value="development">development</option>
                <option value="done">done</option>
              </select>
            ) : (
              <span>{localStatus}</span>
            )}
          </div>
        </div>
        <div className={[s.buttons, s.item].join(' ')}>
          <div className={s.editBox}>
            <button type="button" onClick={switchToInputs}>
              <SvgSelector id="edit" />
            </button>
            Make your changes
          </div>
          <button type="button" onClick={saveChanges}>
            Save changes
          </button>
        </div>
      </BaseModal>
    </div>
  );
};

export type TaskPropsType = {
  taskId: string;
  taskTitle: string;
  description: string;
  creationDate: string;
  timeSpent: string;
  deadlineDate: string;
  priority: PriorityType;
  status: StatusType;
};

export type StatusType = 'queue' | 'development' | 'done';
export type PriorityType = 'low' | 'medium' | 'high';
