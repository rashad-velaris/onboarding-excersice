import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../app/taskSlicer";

function EditTask({ title, desc }) {
  const dispatch = useDispatch();
  const [newTitle, setTitle] = useState(title);
  const [newDesc, setDesc] = useState(desc);
  const navigate = useNavigate();
  const onClear = () => {
    setTitle("");
    setDesc("");
  };
  const onEditTask = () => {
    dispatch(addTask({ title: title, description: desc }));
    navigate("/tasks/home");
  };
  return (
    <>
      <Header />
      <div className="edit-task-ctn">
        <div className="edit-task-card">
          <input
            type="text"
            id="title"
            name="title"
            className="task-title-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="textarea"
            id="task-des"
            name="task-des"
            className="task-des-input"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <div className="task-actions-ctn">
            <button
              className="add-new-task"
              onClick={onEditTask}
              disabled={!title}
            >
              Edit Task
            </button>
            <button className="clear-new-task" onClick={onClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTask;
