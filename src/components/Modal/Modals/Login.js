import React from 'react';
import {Modal} from '../Modal';
import {fetchAuth, selectIsAuthStatus} from '../../../redux/slices/auth';
import {closeModal} from '../../../redux/slices/modal';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {selectTasksStatus} from '../../../redux/slices/tasks';

export const Login = ({
                          text,
                          setText
                      }) => {
    const dispatch = useDispatch()
    const authStatus = useSelector(selectIsAuthStatus)
    const tasksStatus = useSelector(selectTasksStatus)
    const statusApp = tasksStatus || authStatus
    const postLogin = async () => {
        if (text.trim().length < 3) {
            return toast.error('введите минимум 3 символа')
        }
        dispatch(fetchAuth({fullName: text}))
        dispatch(closeModal())
    }
    const keyPress = (e) => {
        if (e.key === 'Enter') {
            postLogin()
        }
    }

    return (
        <Modal
            title="Вход"
            children={
                <div className={'header_right_modal-login'}>
                    <div>Введите ваше имя:</div>
                    <input type="text"
                           value={text}
                           onKeyDown={keyPress}
                           onChange=
                               {(e) => setText(e.currentTarget.value.trim())}/>
                    <button onClick={postLogin} disabled={statusApp}>Подтвердить</button>
                </div>}
        />
    )
}
