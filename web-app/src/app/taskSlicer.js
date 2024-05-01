import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../constants/apiConstants";

const initialState = {
  value: [],
  loading: false,
};

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    await axios({
      method: "POST",
      url: `${BASE_API}/tasks`,
      headers: {
        ContentType: "application/json",
      },
      data: task,
    });
    const response = await axios({
      method: "GET",
      url: `${BASE_API}/tasks`,
      headers: {
        ContentType: "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
});

export const deleteTask = createAsyncThunk("tasks/deleteTasks", async (id) => {
  try {
    await axios({
      method: "DELETE",
      url: `${BASE_API}/tasks/${id}`,
      headers: {
        ContentType: "application/json",
      },
    });
    const response = await axios({
      method: "GET",
      url: `${BASE_API}/tasks`,
      headers: {
        ContentType: "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
});

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_API}/tasks`,
      headers: {
        ContentType: "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, _) => {
      state.loading = "failed";
    });
    builder.addCase(deleteTask.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(deleteTask.rejected, (state, _) => {
      state.loading = "failed";
    });
  },
});

export default taskSlice.reducer;
