import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import logoSvg from "../../assets/logo.svg";
import noAvatar from "../../assets/noavatar.jpg";
import CurrentUser from "../CurrentUser/CurrentUser";

function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = React.useState();

  const changeChatHandler = (item) => {
    setCurrentSelected(item);
    changeChat(item);
  };
  return (
    <Container>
      <div className="brand">
        <img src={logoSvg} alt="Logo" />
        <h3>Shappy Chat</h3>
      </div>
      <div className="contacts">
        {contacts.map((item) => (
          <div
            key={item._id}
            className={`contact ${
              item._id === currentSelected?._id ? "selected" : ""
            }`}
            onClick={() => changeChatHandler(item)}
          >
            <div className="avatar">
              <img src={item.avatarUrl.length > 0 ? `http://62.113.104.159:8000${item.avatarUrl}` : noAvatar} alt="avatar" />
            </div>
            <div className="username">
              <h3>{item.username}</h3>
            </div>
          </div>
        ))}
      </div>
      <CurrentUser />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          width:3rem;
          object-fit:cover;
          border-radius:50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
`;

export default Contacts;
