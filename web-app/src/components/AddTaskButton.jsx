import { React } from "react";
import { useNavigate } from "react-router-dom";

function AddTaskBtn() {
  const navigate = useNavigate();
  const onAddTask = () => {
    navigate("/tasks/add");
  };
  return (
    <>
      <div className="add-task-btn-container">
        <button className="add-task-btn" onClick={onAddTask}>
          Add Task
        </button>
      </div>
    </>
  );
}

export default AddTaskBtn;
