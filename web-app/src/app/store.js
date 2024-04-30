import { configureStore } from "@reduxjs/toolkit";
import task from "./taskSlicer";

export default configureStore({
  reducer: {
    tasks: task,
  },
});
