import React, { useEffect, useState } from "react";
import "../assets/UserList.css";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "../assets/UserForm.css";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.usersList);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/user-form/${id}`);
  };

  const confirmDelete = () => {
    if (deleteUserId !== null) {
      dispatch(deleteUser(deleteUserId));
      setDeleteUserId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="table-container">
        <h2>USER LIST</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td data-label="#"> {index + 1} </td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Username">{user.username}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Phone">{user.phone}</td>
                <td data-label="Actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => setDeleteUserId(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteUserId !== null && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button className="cancel" onClick={() => setDeleteUserId(null)}>
                Cancel
              </button>
              <button className="confirm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
