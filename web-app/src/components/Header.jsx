import { React } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/tasks/home");
  };
  return (
    <>
      <div className="header-container" onClick={goHome}>
        <h2 className="header">Task Keeper</h2>
      </div>
    </>
  );
}

export default Header;
