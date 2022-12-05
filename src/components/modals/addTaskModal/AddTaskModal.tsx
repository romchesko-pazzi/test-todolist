import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { createTask } from '../../../context/tasksReducer/TasksReducer';
import {
  buttonFields,
  Priorities,
  Statuses,
  taskFields,
} from '../../../data/constants/fields';
import { guid } from '../../../utils/functions/generateRandomId/guid';
import { getDate, getDeadlineDate } from '../../../utils/functions/getDate/getDate';
import { PriorityType, StatusType } from '../../task/Task';
import { BaseModal } from '../baseModal/BaseModal';

import s from './addTaskModal.module.scss';

export const AddTaskModal: React.FC<PropsType> = props => {
  const { switchModal, modalActive, todolistId } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<PriorityType>(Priorities.low);
  const [status, setStatus] = useState<StatusType>(Statuses.queue);
  const reset = () => {
    setTaskTitle('');
    setTimeSpent('');
    setDeadline('');
    setDescription('');
    setPriority(Priorities.low);
    setStatus(Statuses.queue);
  };

  useEffect(() => {
    if (!modalActive) reset();
  }, [modalActive]);

  const dispatch = useDispatch();
  // handlers
  const taskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const descriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };
  const elapsedTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeSpent(e.currentTarget.value);
  };
  const endDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.currentTarget.value);
  };
  const setPriorityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.currentTarget.value as PriorityType);
  };
  const setStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value as StatusType);
  };

  const createNewTaskHandler = () => {
    const creationDate = getDate();
    const deadlineDate = getDeadlineDate(deadline);

    dispatch(
      createTask({
        todolistId,
        taskTitle,
        description,
        creationDate,
        timeSpent,
        deadlineDate,
        priority,
        status,
        taskId: guid(),
      }),
    );
    switchModal(false);
    reset();
  };

  const fields = [
    {
      label: taskFields.taskName,
      type: 'text',
      value: taskTitle,
      callback: taskTitleHandler,
    },
    {
      label: taskFields.timeSpent,
      type: 'text',
      value: timeSpent,
      callback: elapsedTimeHandler,
    },
    {
      label: taskFields.deadline,
      type: 'date',
      value: deadline,
      callback: endDateHandler,
    },
  ];

  return (
    <BaseModal active={modalActive} setActive={switchModal}>
      <div className={s.main}>
        {fields.map(field => (
          <div key={field.label}>
            {field.label}
            <input value={field.value} type={field.type} onChange={field.callback} />
          </div>
        ))}
        <div className={s.description}>
          {taskFields.description}
          <textarea value={description} onChange={descriptionHandler} />
        </div>
        <div>
          {taskFields.priority}
          <select value={priority} onChange={setPriorityHandler}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
        <div>
          {taskFields.status}
          <select value={status} onChange={setStatusHandler}>
            <option value="queue">queue</option>
            <option value="development">development</option>
            <option value="done">done</option>
          </select>
        </div>
        <div>
          {taskFields.attachFiles}
          <input type="file" />
        </div>
      </div>
      <button type="button" onClick={createNewTaskHandler}>
        {buttonFields.createBtn}
      </button>
    </BaseModal>
  );
};

type PropsType = {
  todolistId: string;
  switchModal: (modalActive: boolean) => void;
  modalActive: boolean;
};
