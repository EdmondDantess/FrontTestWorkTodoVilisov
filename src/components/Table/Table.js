import React, {useState} from 'react';
import './table.css'
import {useDispatch, useSelector} from 'react-redux';
import {fetchUpdateTask, selectTasks, selectTasksStatus} from '../../redux/slices/tasks';
import {Task} from '../Task/Task';
import {selectIsAuthStatus} from '../../redux/slices/auth';

export const Table = () => {
    const [isOver, setIsOver] = useState(false)
    const [isOverProgress, setIsOverProgress] = useState(false)
    const [isOverFinish, setIsOverFinish] = useState(false)
    const [task, setTask] = useState('')
    const [status, setStatus] = useState('')

    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)
    const authStatus = useSelector(selectIsAuthStatus)
    const tasksStatus = useSelector(selectTasksStatus)
    const statusApp = tasksStatus || authStatus

    const tasksPending = tasks?.filter(el => el.status === 'pending')
    const tasksInProgress = tasks?.filter(el => el.status === 'in-progress')
    const tasksFinish = tasks?.filter(el => el.status === 'finish')

    const handleDragStart = (el) => {
        setTask(el)
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsOver(true);
        setStatus('pending')
    };
    const handleDragOverProgress = (e) => {
        e.preventDefault();
        setIsOverProgress(true)
        setStatus('in-progress')
    };
    const handleDragOverFinish = (e) => {
        e.preventDefault();
        setIsOverFinish(true)
        setStatus('finish')
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsOver(false);
        setIsOverProgress(false)
        setIsOverFinish(false)
        setStatus('')
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsOver(false);
        setStatus('');
        setIsOverProgress(false)
        setIsOverFinish(false)
        const patchStatus = tasks.find(el => el._id === task)
        dispatch(fetchUpdateTask({
            title: patchStatus.title,
            text: patchStatus.text,
            _id: task,
            status
        }))
        setTask('')
    };


    return (
        <div className={'table'}>
            {!statusApp
                ? <div className={'table__container'}>
                    <div className={`table__pending`}
                         onDragOver={handleDragOver}
                         onDragLeave={handleDragLeave}
                         onDrop={handleDrop}
                         style={{backgroundColor: isOver ? 'lightgray' : 'white'}}
                    >
                        {tasksPending?.map(el =>
                            <Task
                                handleDragStart={handleDragStart}
                                task={el}
                                key={el.title}
                                statusApp={statusApp}
                            />)}
                    </div>
                    <div className={`table__in-progress`}
                         onDragOver={handleDragOverProgress}
                         onDragLeave={handleDragLeave}
                         onDrop={handleDrop}
                         style={{backgroundColor: isOverProgress ? 'lightgray' : 'white'}}>
                        {tasksInProgress?.map(el =>
                            <Task task={el}
                                  handleDragStart={handleDragStart}
                                  key={el.title}
                                  statusApp={statusApp}
                            />)}
                    </div>
                    <div className={`table__finish`}
                         onDragOver={handleDragOverFinish}
                         onDragLeave={handleDragLeave}
                         onDrop={handleDrop}
                         style={{backgroundColor: isOverFinish ? 'lightgray' : 'white'}}>
                        {tasksFinish?.map(el =>
                            <Task handleDragStart={handleDragStart}
                                  task={el}
                                  key={el.title}
                                  statusApp={statusApp}
                            />)}
                    </div>
                </div>
                : <div className="loader"></div>
            }
        </div>
    );
};
