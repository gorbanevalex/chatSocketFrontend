import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import robot from "../../assets/robot.gif";

function Welcome() {
  const currentUser = useSelector((state) => state.auth.data);
  return (
    <Container>
      <img src={robot} alt="hi!" />
      <h1>
        С возвращением <span>{currentUser?.username}</span>!
      </h1>
      <h3>Выбирай чат и начинай общаться!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
