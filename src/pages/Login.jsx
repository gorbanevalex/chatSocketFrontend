import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { isAuthCheck, login } from "../redux/auth/authSlice";

const toastOption = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fields, setFields] = React.useState({
    username: "",
    password: "",
  });

  const validationHandler = () => {
    const { username, password } = fields;

    if (username === "") {
      toast.error("Введите имя пользователя!", toastOption);
      return false;
    } else if (password === "") {
      toast.error("Введите пароль!", toastOption);
      return false;
    }
    return true;
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (validationHandler()) {
      axios
        .post("/login", fields)
        .then((res) => {
          dispatch(login(res.data.user));
          window.localStorage.setItem("token", res.data.token);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.msg, toastOption);
        });
    }
  };

  const changeFieldHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  if (window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={formSubmitHandler}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>Chat by Gorbanev</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => changeFieldHandler(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => changeFieldHandler(e)}
          />
          <button type="submit">Войти</button>
          <span>
            Еще нет аккаунта?<Link to={"/register"}>Зарегестрироваться</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.5s ease 0s;
    &:hover {
      background-color: #4e0eff;
      transition: background-color 0.5s ease 0s;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
