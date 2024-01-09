import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from './slices/auth';
import {modalReducer} from './slices/modal';
import {tasksReducer} from './slices/tasks';

const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            modal: modalReducer,
            tasks: tasksReducer,
        },
    },
)

export default store
