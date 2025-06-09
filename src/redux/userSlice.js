import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const usersReducer = createSlice({
  name: "users",
  initialState: {
    usersList: [],
  },
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { setUsersList } = usersReducer.actions;

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      dispatch(setUsersList(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const addUser = (newUser) => {
  return async () => {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      toast.success(`User added successfully!`);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
};

export const editUser = (updatedUser) => {
  return async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      toast.success(`User updated successfully!`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
};

export const deleteUser = (id) => {
  return async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      toast.success(`User deleted successfully!`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
};



export default usersReducer.reducer;
