import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../assets/UserForm.css";

function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <nav>
        <h1>REDUX CRUD</h1>
        <div className="nav-buttons">
          <button className="add" onClick={() => navigate("/UserForm")}>Add User</button>
          <button className="list" onClick={() => navigate("/UserList")}>User List</button>
          <button className="logout" onClick={() => setShowModal(true)}>
            Logout
          </button>
        </div>
      </nav>

       {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Logout</h2>
            <p>Do you want to logout?</p>
            <div className="modal-actions">
              <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="confirm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Navbar