import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />}/>
        <Route path="tasks/home" element={<TaskList />} />
        <Route path="tasks/add" element={<AddTask />} />
        <Route path="tasks/edit" element={<EditTask />} />
        <Route
          path="*"
          element={<h1 className="not-found">404 Not Found</h1>}
        />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
