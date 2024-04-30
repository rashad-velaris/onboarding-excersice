import { React } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../app/taskSlicer";

function Task({ title, id }) {
  const dispatch = useDispatch();
  const onTaskDelete = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <>
      <div className="task-card">
        <h3 className="task-title">{title}</h3>
        <div className="edit-btn-ctn">
          <button className="task-edit-btn">Edit</button>
        </div>
        <div className="dlt-btn-ctn">
          <button className="task-delete-btn" onClick={() => onTaskDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Task;
