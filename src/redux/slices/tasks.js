import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const {data} = await instance.get('/tasks')
    return data
})
export const fetchTask = createAsyncThunk('tasks/fetchTask', async (params) => {
    const {data} = await instance.post('/tasks', params)
    return data
})
export const fetchUpdateTask = createAsyncThunk('tasks/fetchUpdateTask', async (params) => {
    const {data} = await instance.patch('/tasks/' + params._id, params)
    return data
})

const initialState = {
    data: null,
    status: 'loading',
}

const tasksSlice = createSlice({
        name: 'tasks',
        initialState,
        extraReducers: {
            [fetchTasks.pending]: (state) => {
                state.status = 'loading'
                state.data = null
            },
            [fetchTasks.fulfilled]: (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            },
            [fetchTasks.rejected]: (state) => {
                state.status = 'error'
                state.data = null
            },
            [fetchTask.pending]: (state) => {
                state.status = 'loading'
                state.data = null
            },
            [fetchTask.fulfilled]: (state, action) => {
                state.status = 'loaded'
            },
            [fetchTask.rejected]: (state) => {
                state.status = 'error'
                state.data = null
            },
            [fetchUpdateTask.pending]: (state) => {
                state.status = 'loading'
                state.data = null
            },
            [fetchUpdateTask.fulfilled]: (state, action) => {
                state.status = 'loaded'
            },
            [fetchUpdateTask.rejected]: (state) => {
                state.status = 'error'
                state.data = null
            }
        }
    }
)

export const selectTasks = state => state.tasks.data
export const tasksReducer = tasksSlice.reducer
