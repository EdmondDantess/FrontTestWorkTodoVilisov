import React from 'react';
import {Modal} from '../Modal';
import {fetchAuth} from '../../../redux/slices/auth';
import {closeModal} from '../../../redux/slices/modal';
import {useDispatch} from 'react-redux';

export const Login = ({
                          text,
                       setText
                      }) => {
    const dispatch = useDispatch()
   const postLogin = async () => {
        dispatch(fetchAuth({fullName: text}))
        dispatch(closeModal())
    }
    const keyPress = (e) => {
        if (text.length >= 3 && e.key === 'Enter') {
            setText('')
            dispatch(closeModal())
            dispatch(fetchAuth({fullName: text}))
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
                    <button onClick={postLogin}>Подтвердить</button>
                </div>}
        />
    )
}

