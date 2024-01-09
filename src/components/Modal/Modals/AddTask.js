import React from 'react';
import {Modal} from '../Modal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTask, fetchUpdateTask, selectTasksStatus} from '../../../redux/slices/tasks';
import {selectIsAuthStatus} from '../../../redux/slices/auth';

export const AddTask = ({
                            text,
                            setText,
                            titleText,
                            setTitleText,
                            task = {},
                            mode = 'add'
                        }) => {

    const dispatch = useDispatch()
    const authStatus = useSelector(selectIsAuthStatus)
    const tasksStatus = useSelector(selectTasksStatus)
    const statusApp = tasksStatus || authStatus
    const createTaskUpdate = () => {
        if (mode === 'add') {
            dispatch(fetchTask({
                title: titleText,
                text: text,
                status: 'pending'
            }))
        } else {
            dispatch(fetchUpdateTask({
                title: titleText,
                text: text,
                status: task.status,
                _id: task._id
            }))
        }
    }


    return (
        <Modal
            title="Задача"
            children={
                <div className={'header_left_modal-add-task'}>
                    <div>Введите название задачи:</div>
                    <input type="text" value={titleText}
                           onChange={(e) => setTitleText(e.currentTarget.value)}/>
                    <div>Введите Описание</div>
                    <textarea value={text}
                              onChange={(e) => setText(e.currentTarget.value)}/>
                   <div>{task.status}</div>
                    <button
                        onClick={() => createTaskUpdate()}
                        disabled={statusApp}
                    >Подтвердить
                    </button>
                </div>
            }
        />
    );
};

