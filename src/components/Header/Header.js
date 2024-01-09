import React, {useState} from 'react';
import './header.css'
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectIsAuth, selectName} from '../../redux/slices/auth';
import {openModal} from '../../redux/slices/modal';
import {Login} from '../Modal/Modals/Login';
import {AddTask} from '../Modal/Modals/AddTask';
import {ToastAlert} from '../Toast/Toast';

export const Header = () => {
    const [text, setText] = useState('')
    const [titleText, setTitleText] = useState('')
    const [variantModal, setVariantModal] = useState(null)
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const userName = useSelector(selectName)

    const logOut = () => {
        dispatch(logout())
    }
    const openLogin = () => {
        setVariantModal('login')
        setText('')
        dispatch(openModal())
    }
    const openAddTask = () => {
        setVariantModal('addTask')
        setText('')
        dispatch(openModal())
    }

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header_left'}>
                    <button onClick={openAddTask} disabled={!isAuth}>Add Task</button>
                    {variantModal === 'addTask'
                        && <AddTask setText={setText}
                                    setTitleText={setTitleText}
                                    titleText={titleText}
                                    text={text}/>}
                </div>
                <div className={'header_right'}>
                    {
                        isAuth
                            ? <div>Вы вошли как: {userName}</div>
                            : <button onClick={openLogin}>Login</button>
                    }
                    {isAuth && <button onClick={logOut}>Logout</button>}
                </div>
                {variantModal === 'login'
                    && <Login setText={setText}
                              text={text}/>}
            </div>
            <ToastAlert/>

        </div>
    );
};
