import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import { createTask } from '../../../context/tasksReducer/TasksReducer';
import s from '../../../pages/tasksList/tasksList.module.scss';
import { guid } from '../../../utils/functions/generateRandomId/guid';
import { BaseModal } from '../baseModal/BaseModal';

export const AddTaskModal: React.FC<PropsType> = props => {
  const { switchModal, modalActive, boardId } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [taskNumber, setTaskNumber] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

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
  const dateCreatedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCreationDate(e.currentTarget.value);
  };
  const elapsedTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setElapsedTime(e.currentTarget.value);
  };
  const endDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.currentTarget.value);
  };
  const setPriorityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPriority(e.currentTarget.value);
  };
  const setStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  const createNewTaskHandler = () => {
    dispatch(
      createTask({
        boardId,
        taskTitle,
        taskNumber,
        description,
        creationDate,
        elapsedTime,
        endDate,
        priority,
        status,
        taskId: guid(),
      }),
    );
    switchModal(false);
    setTaskTitle('');
  };

  return (
    <BaseModal active={modalActive} setActive={switchModal}>
      <div className={s.taskTitle}>
        Enter task name
        <input value={taskTitle} onChange={taskTitleHandler} />
      </div>
      <div>
        Task number:
        <input value={taskNumber} onChange={taskNumberHandler} />
      </div>
      <div>
        Description:
        <input value={description} onChange={descriptionHandler} />
      </div>
      <div>
        Date created:
        <input type="date" value={creationDate} onChange={dateCreatedHandler} />
      </div>
      <div>
        Elapsed time:
        <input type="date" value={elapsedTime} onChange={elapsedTimeHandler} />
      </div>
      <div>
        End date:
        <input type="date" value={endDate} onChange={endDateHandler} />
      </div>
      <div>
        Priority:
        <input value={priority} onChange={setPriorityHandler} />
      </div>
      <div>
        Status:
        <input value={status} onChange={setStatusHandler} />
      </div>
      <div>
        Attach files:
        <input type="file" />
      </div>
      <button type="button" onClick={createNewTaskHandler}>
        create
      </button>
    </BaseModal>
  );
};

type PropsType = {
  boardId: string;
  switchModal: (modalActive: boolean) => void;
  modalActive: boolean;
};
