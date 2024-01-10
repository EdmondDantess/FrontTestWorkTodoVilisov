import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusAddTask: false,
  statusEditTask: false,
  statusLogin: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalAddTask: (state) => {
      state.statusAddTask = true;
    },
    closeModalAddTask: (state) => {
      state.statusAddTask = false;
    },
    openModalEditTask: (state) => {
      state.statusEditTask = true;
    },
    closeModalEditTask: (state) => {
      state.statusEditTask = false;
    },
    openModalAddLogin: (state) => {
      state.statusLogin = true;
    },
    closeModalLogin: (state) => {
      state.statusLogin = false;
    }
  }
});
export const selectIsModalAddTask = (state) => state.modal.statusAddTask;
export const selectIsModalEditTask = (state) => state.modal.statusEditTask;
export const selectIsModalLogin = (state) => state.modal.statusLogin;
export const modalReducer = modalSlice.reducer;
export const {
  openModalAddTask,
  closeModalAddTask,
  closeModalEditTask,
  closeModalLogin,
  openModalAddLogin,
  openModalEditTask
} = modalSlice.actions;
