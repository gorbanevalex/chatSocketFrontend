import React from "react";
import styled from "styled-components";
import axios from "../axios";
import Contacts from "../components/Contacts/Contacts";
import Welcome from "../components/Welcome/Welcome";

function Chat() {
  const [contacts, setContacts] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState();
  React.useEffect(() => {
    axios
      .get("/contacts")
      .then(({ data }) => {
        setContacts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ChatContainer>
      <div className="container">
        <Contacts contacts={contacts} changeChat={setSelectedChat} />
        {!selectedChat && <Welcome />}
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
