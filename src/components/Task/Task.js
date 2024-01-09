import React, {useState} from 'react';
import './task.css'

const statuses = ['pending', 'in-progress', 'finish']

export const Task = ({
                         handleDragStart,
                         task
                     }) => {

    return (
        <div className={'task'}
             title={task.text}
             draggable
             onDragStart={(e) => handleDragStart(e, task._id)}>
            <div className={'task__title'}>
                Название: {task.title}
            </div>
            <div className={'task__text'}>
                Текст: {task.text}
            </div>
            <div className={'task__author'}>
                Кто создал: {task.user?.fullName}
            </div>
            <div className={'task__status'}>
                Статус:
                <select value={task.status}>
                    <option name="in-progress" id="finish">323</option>
                    <option name="finish" id="in-progress">2222222</option>
                    <option name="pending" id="pending">Ожидание</option>
                </select>

            </div>
            <div className={'task__data'}>
                Дата создания:
                <div>{new Date(task.createdAt).toLocaleString()}</div>
            </div>
        </div>
    );
};

