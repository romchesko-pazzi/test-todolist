import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  updateTaskData,
  UpdateTaskDataType,
} from '../../context/tasksReducer/TasksReducer';
import {
  buttonFields,
  Priorities,
  Statuses,
  taskFields,
} from '../../data/constants/fields';
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
    todolistId,
    setDraggable,
    isDraggable,
  } = props;

  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [localTaskTitle, setLocalTaskTitle] = useState(taskTitle);
  const [localDescription, setLocalDescription] = useState(description);
  const [localTimeSpent, setLocalTimeSpent] = useState(timeSpent);
  const [localPriority, setLocalPriority] = useState<PriorityType>(priority);
  const [localStatus, setLocalStatus] = useState<StatusType>(status);

  // for draggable changing status
  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const openCloseModal = () => {
    setModalActive(!modalActive);
    setDraggable(!isDraggable);
  };
  const switchToInputs = () => {
    setIsInput(!isInput);
  };
  const saveChanges = () => {
    setIsInput(false);
    setModalActive(false);
    dispatch(
      updateTaskData({
        taskTitle: localTaskTitle,
        description: localDescription,
        timeSpent: localTimeSpent,
        priority: localPriority,
        status: localStatus,
        taskId,
        todolistId,
      }),
    );
    setDraggable!(!isDraggable);
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
  const changePriorityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalPriority(e.currentTarget.value as PriorityType);
  };
  const changeStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalStatus(e.currentTarget.value as StatusType);
  };

  let color = s.priorityLow;

  if (priority === Priorities.medium) {
    color = s.priorityMedium;
  } else if (priority === Priorities.high) {
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
          <span>
            {taskFields.dateCreated}: {creationDate}
          </span>
          <span>
            {taskFields.deadline}: {deadlineDate}
          </span>
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
            <span className={s.itemLabel}>{taskFields.description}: </span>
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
          <div className={s.item}>
            <span className={s.itemLabel}>
              {taskFields.dateCreated}: {creationDate}
            </span>
          </div>
          <div className={s.item}>
            <span className={s.itemLabel}>{taskFields.timeSpent}: </span>
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
            <span className={s.itemLabel}>
              {taskFields.deadline}: {deadlineDate}
            </span>
          </div>
          <div className={s.item}>
            <span className={s.itemLabel}>{taskFields.priority}: </span>
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
            <span className={s.itemLabel}>{taskFields.status}: </span>
            {isInput ? (
              <select
                className={s.itemInput}
                value={localStatus}
                onChange={changeStatusHandler}
              >
                <option value={Statuses.queue}>{Statuses.queue}</option>
                <option value={Statuses.development}>{Statuses.development}</option>
                <option value={Statuses.done}>{Statuses.done}</option>
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
            {buttonFields.editBtn}
          </div>
          <button type="button" onClick={saveChanges}>
            {buttonFields.saveBtn}
          </button>
        </div>
      </BaseModal>
    </div>
  );
};

export type TaskPropsType = UpdateTaskDataType & {
  creationDate: string;
  deadlineDate: string;
  setDraggable: (value: boolean) => void;
  isDraggable: boolean;
};

export type StatusType = 'queue' | 'development' | 'done';
export type PriorityType = 'low' | 'medium' | 'high';
