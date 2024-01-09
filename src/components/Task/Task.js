import React, {useState} from 'react';
import './task.css'
import {fetchRemoveTask, fetchUpdateTask} from '../../redux/slices/tasks';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {AddTask} from '../Modal/Modals/AddTask';
import {openModal} from '../../redux/slices/modal';

const statuses = ['pending', 'in-progress', 'finish']

export const Task = ({
                         statusApp,
                         handleDragStart,
                         task
                     }) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(task.text)
    const [titleText, setTitleText] = useState(task.title)
    const removeTask = (id) => {
        if (!statusApp) dispatch(fetchRemoveTask(id))
        else toast.warn('подождите...')
    }
    const editTask = () => {
        if (!statusApp) {
            setEdit(true)
            dispatch(openModal())
        }
    }
    const changeStatus = (e) => {
        dispatch(fetchUpdateTask({status: e.currentTarget.value, _id: task._id}))
    }

    return (
        <div className={'task'}
             title={task.text}
             draggable
             onDragStart={() => handleDragStart(task._id)}>
            {edit &&
                <AddTask task={task} setText={setText} text={text} titleText={titleText} setTitleText={setTitleText}
                         mode={'edit'}/>}
            <div className="task__delete" title={'удалить'} onClick={() => removeTask(task._id)}>&#10060;</div>
            <div className="task__edit" title={'редактировать'} onClick={editTask}>✏️</div>
            <div className={'task__title'}>
                Название: {task.title}
            </div>
            <div className={'task__status'}>
                Статус:
                <select value={task.status}
                        defaultValue="pending"
                        onChange={(e) => changeStatus(e)}>
                    {
                        statuses.map((el, i) =>
                            <option name={el} id={el} key={el.title}>{el}</option>)
                    }
                </select>
            </div>
            <div className={'task__author'}>
                Кто создал: {task.user?.fullName}
            </div>
            <div className={'task__text'}>
                Текст: {task.text}
            </div>

            <div className={'task__data'}>
                Дата создания:
                <div>{new Date(task.createdAt).toLocaleString()}</div>
            </div>
        </div>
    );
};

