import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noavatar.jpg";

function CurrentUser() {
  const currentUser = useSelector((state) => state.auth.data);
  return (
    <>
      <Container>
        <div className="avatar">
          <img src={noAvatar} alt="avatar" />
        </div>
        <div className="username">
          <h2>{currentUser?.username}</h2>
        </div>
      </Container>
      <Modal>
        <div className="modal-bg"></div>
        <div className="modal-body">
          <div className="chande-avatar">
            <input type="file" hidden />
            <img src={noAvatar} alt="" />
          </div>
          <button>Сохранить</button>
        </div>
      </Modal>
    </>
  );
}

const Container = styled.div`
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    img {
      height: 4rem;
      max-inline-size: 100%;
    }
  }
  .username {
    h2 {
      color: white;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default CurrentUser;
