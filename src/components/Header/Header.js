import React from 'react';
import './header.css'

export const Header = () => {
    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header_left'}>
                    <button>Add Task</button>
                </div>
                <div className={'header_right'}>
                    <button>Login</button>
                    <button>Logout</button>
                </div>
            </div>
        </div>
    );
};
