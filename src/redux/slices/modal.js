import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.status = true
        },
        closeModal: (state) => {
            state.status = false
        },
    }
})
export const selectIsModal = state => state.modal.status
export const modalReducer = modalSlice.reducer
export const {openModal, closeModal} = modalSlice.actions
