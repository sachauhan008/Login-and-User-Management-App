import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../redux/userSlice";
import Navbar from "../components/Navbar";
import "../assets/UserForm.css";
import axios from "axios";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            name: data.name || "",
            username: data.username || "",
            email: data.email || "",
            phone: data.phone || ""
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(editUser({ ...formData, id: parseInt(id) }));
    } else {
      const newUser = {
        ...formData,
        id: Math.floor(Math.random() * 10000) + 100
      };
      dispatch(addUser(newUser));
    }

    navigate("/UserList");
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>{id ? "EDIT USER" : "ADD USER"}</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required />
          <button type="submit">{id ? "Update" : "Add"}</button>
        </form>
      </div>
    </>
  );
}

export default UserForm;
