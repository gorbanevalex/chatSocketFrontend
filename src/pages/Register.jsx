import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../assets/logo.svg";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";

const toastOption = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationHandler = () => {
    const { username, email, password, confirmPassword } = fields;
    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают!", toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error("Длина имени пользователя должна быть больше 3", toastOption);
      return false;
    } else if (password.length < 8) {
      toast.error("Длина пароля должна быть больше 8", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Введите почту", toastOption);
      return false;
    }
    return true;
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (validationHandler()) {
      const { username, email, password } = fields;
      axios
        .post("/register", { username, email, password })
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
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={(e) => changeFieldHandler(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => changeFieldHandler(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => changeFieldHandler(e)}
          />
          <button type="submit">Войти</button>
          <span>
            Уже есть аккаунт?<Link to={"/login"}>Войти</Link>
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

export default Register;
