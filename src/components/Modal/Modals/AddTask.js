import React, {useEffect} from 'react';
import {Modal} from '../Modal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTask} from '../../../redux/slices/tasks';
import {selectName} from '../../../redux/slices/auth';

export const AddTask = ({
                            text,
                            setText,
                            titleText,
                            setTitleText
                        }) => {

    const dispatch = useDispatch()
    const userName = useSelector(selectName)

    const createTask = () => {
        dispatch(fetchTask({
            title: titleText,
            text: text,
            user: '659c29f10e608b46d73d84bf',
            status: 'pending'

        }))
    }

    return (
        <Modal
            title="Задача"
            children={
                <div className={'header_left_modal-add-task'}>
                    <div>Введите название задачи:</div>
                    <input type="text" value={titleText}
                           onChange={(e) => setTitleText(e.currentTarget.value.trim())}/>
                    <div>Введите Описание</div>
                    <textarea value={text}
                              onChange={(e) => setText(e.currentTarget.value.trim())}/>
                    <button
                        onClick={createTask}
                    >Подтвердить
                    </button>
                </div>
            }
        />
    );
};

