import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserForm from "./pages/UserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./pages/UserList";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    const isLoggedIn = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/UserForm" /> : <Navigate to="/Login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/UserForm"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route path="/user-form/:id" element={<UserForm />} />
        <Route
          path="/UserList"
          element={
              <UserList />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
