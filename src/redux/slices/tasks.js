import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";
import { toast } from "react-toastify";
import { closeModalAddTask } from "./modal";

const errorTasksHandler = async (e, dispatch) => {
  let text = "";
  if (e.response.data.message) {
    return toast.error(e.response.data.message);
  }
  e.response.data.forEach(e => text += e.msg);
  toast.error("Ошибка" + text);
  await dispatch(fetchTasks());
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { data } = await instance.get("/tasks");
  return data;
});
export const fetchTask = createAsyncThunk("tasks/fetchTask", async (params, { dispatch }) => {
  try {
    const { data } = await instance.post("/tasks", params);
    if (data) {
      toast.success("Задача создана");
    }
    await dispatch(fetchTasks());
    dispatch(closeModalAddTask());
    return data;
  } catch (e) {
    await errorTasksHandler(e, dispatch);
  }
});
export const fetchUpdateTask = createAsyncThunk("tasks/fetchUpdateTask", async (params, { dispatch }) => {
  try {
    const { data } = await instance.patch("/tasks/" + params._id, params);
    if (data) {
      toast.success("Изменено");
    }
    await dispatch(fetchTasks());
    dispatch(closeModalAddTask());
    return data;
  } catch (e) {
    await errorTasksHandler(e, dispatch);
  }
});
export const fetchOneTask = createAsyncThunk("tasks/fetchOneTask", async (id, { dispatch }) => {
  try {
    const { data } = await instance.get("/tasks/" + id);
    return data;
  } catch (e) {
    await errorTasksHandler(e, dispatch);
  }
});
export const fetchRemoveTask = createAsyncThunk("tasks/fetchRemoveTask", async (id, { dispatch }) => {
  try {
    const { data } = await instance.delete("/tasks/" + id);
    toast.success("удалено");
    await dispatch(fetchTasks());
    return data;
  } catch (e) {
    await errorTasksHandler(e, dispatch);
  }
});

const initialState = {
  data: null,
  dataOneTask: null,
  status: null
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    extraReducers: {
      [fetchTasks.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = null;
      },
      [fetchTasks.pending]: (state) => {
        state.status = "loading";
      },
      [fetchTasks.rejected]: (state) => {
        state.status = null;
      },
      [fetchTask.fulfilled]: (state) => {
        state.status = null;
      },
      [fetchTask.pending]: (state) => {
        state.status = "loading";
      },
      [fetchTask.rejected]: (state) => {
        state.status = null;
      },
      [fetchUpdateTask.fulfilled]: (state) => {
        state.status = null;
      },
      [fetchUpdateTask.pending]: (state) => {
        state.status = "loading";
      },
      [fetchUpdateTask.rejected]: (state) => {
        state.status = null;
      },
      [fetchRemoveTask.fulfilled]: (state) => {
        state.status = null;
      },
      [fetchRemoveTask.pending]: (state) => {
        state.status = "loading";

      },
      [fetchRemoveTask.rejected]: (state) => {
        state.status = null;
      },
      [fetchOneTask.fulfilled]: (state, action) => {
        state.dataOneTask = action.payload;
        state.status = null;
      },
      [fetchOneTask.pending]: (state) => {
        state.status = "loading";
        state.dataOneTask = null;
      },
      [fetchOneTask.rejected]: (state) => {
        state.status = null;
        state.dataOneTask = null;
      }
    }
  }
);

export const selectTasksStatus = state => Boolean(state.tasks.status === "loading");

export const selectTasks = state => state.tasks.data;
export const selectOneTask = state => state.tasks.dataOneTask;
export const tasksReducer = tasksSlice.reducer;
