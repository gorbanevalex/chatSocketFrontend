import React from "react";
import styled from "styled-components";
import axios from "../../axios";

import noavatar from "../../assets/noavatar.jpg";
import ContainerInput from "../ContainerInput.jsx/ContainerInput";
import Logout from "../Logout/Logout";

function ContainerChat({ selectedChat }) {
  const chatMessagesRef = React.useRef(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  });

  React.useEffect(() => {
    if (selectedChat) {
      axios
        .post("/chat/get-messages", {
          to: selectedChat._id,
        })
        .then((res) => {
          setMessages(res.data);
        });
    }
  }, [selectedChat]);

  const postMessage = (message) => {
    axios
      .post("/chat/add-message", {
        to: selectedChat._id,
        message,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={noavatar} alt="" />
          </div>
          <div className="username">
            <h3>{selectedChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((item) => (
          <div>
            <div className={`message ${item.mySelf ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ContainerInput postMessage={postMessage} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ContainerChat;
