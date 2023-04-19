import React from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../axios";
import Contacts from "../components/Contacts/Contacts";
import ContainerChat from "../components/ContainerChat/ContainerChat";
import Welcome from "../components/Welcome/Welcome";
import { isAuthCheck } from "../redux/auth/authSlice";

function Chat() {
  const socket = React.useRef();
  const isAuth = useSelector(isAuthCheck);
  const userData = useSelector((state) => state.auth.data);
  const [contacts, setContacts] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState();
  React.useEffect(() => {
    axios
      .get("/contacts")
      .then(({ data }) => {
        setContacts(data);
      })
  }, []);

  React.useEffect(() => {
    if (isAuth) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", userData._id);
    }
  }, [isAuth]);

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <ChatContainer>
      <div className="container">
        <Contacts contacts={contacts} changeChat={setSelectedChat} />
        {!selectedChat ? (
          <Welcome />
        ) : (
          <ContainerChat selectedChat={selectedChat} socket={socket} />
        )}
      </div>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
  }
`;

export default Chat;
