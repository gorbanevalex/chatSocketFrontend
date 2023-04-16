import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { login } from "./redux/auth/authSlice";
import axios from "./axios";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios
      .get("/me")
      .then((res) => {
        dispatch(login(res.data.user));
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

export default App;
