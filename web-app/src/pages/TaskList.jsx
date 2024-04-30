import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../app/taskSlicer";
import AddTaskBtn from "../components/AddTaskButton";
import Header from "../components/Header";
import Task from "../components/Task";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.value);
  const loading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <>
      <Header />
      <AddTaskBtn />
      {!loading && (
        <div className="task-list-container">
          {tasks.map((task, i) => {
            return <Task key={i} title={task.title} id={task.id} />;
          })}
        </div>
      )}
    </>
  );
}

export default TaskList;
