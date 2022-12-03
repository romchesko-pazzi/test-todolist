import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import { createTask } from '../../../context/tasksReducer/TasksReducer';
import { guid } from '../../../utils/functions/generateRandomId/guid';
import { getDate } from '../../../utils/functions/getDate/getDate';
import { StatusType } from '../../task/Task';
import { BaseModal } from '../baseModal/BaseModal';

import s from './addTaskModal.module.scss';

export const AddTaskModal: React.FC<PropsType> = props => {
  const { switchModal, modalActive, todolistId } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [taskNumber, setTaskNumber] = useState('');
  const [description, setDescription] = useState('');
  const [timeSpent, setElapsedTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState<StatusType>('queue');

  const dispatch = useDispatch();

  // handlers
  const taskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const taskNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskNumber(e.currentTarget.value);
  };
  const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };
  const elapsedTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setElapsedTime(e.currentTarget.value);
  };
  const endDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.currentTarget.value);
  };
  const setPriorityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.currentTarget.value);
  };
  const setStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value as StatusType);
  };

  const createNewTaskHandler = () => {
    const creationDate = getDate();

    dispatch(
      createTask({
        todolistId,
        taskTitle,
        taskNumber,
        description,
        creationDate,
        timeSpent,
        endDate,
        priority,
        status,
        taskId: guid(),
      }),
    );
    switchModal(false);
    setTaskTitle('');
  };

  const fields = [
    {
      label: 'Enter task name:',
      type: 'text',
      value: taskTitle,
      callback: taskTitleHandler,
    },
    {
      label: 'Task number:',
      type: 'text',
      value: taskNumber,
      callback: taskNumberHandler,
    },
    {
      label: 'Description:',
      type: 'text',
      value: description,
      callback: descriptionHandler,
    },
    {
      label: 'Time spent: (hours)',
      type: 'text',
      value: timeSpent,
      callback: elapsedTimeHandler,
    },
    {
      label: 'End date:',
      type: 'date',
      value: endDate,
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
        <div>
          Priority:
          <select value={priority} onChange={setPriorityHandler}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
        <div>
          Status:
          <select value={status} onChange={setStatusHandler}>
            <option value="queue">queue</option>
            <option value="development">development</option>
            <option value="done">done</option>
          </select>
        </div>
        <div>
          Attach files:
          <input type="file" />
        </div>
      </div>
      <button type="button" onClick={createNewTaskHandler}>
        create
      </button>
    </BaseModal>
  );
};

type PropsType = {
  todolistId: string;
  switchModal: (modalActive: boolean) => void;
  modalActive: boolean;
};
