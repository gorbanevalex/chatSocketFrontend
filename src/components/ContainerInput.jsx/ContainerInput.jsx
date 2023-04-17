import React from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

function ContainerInput({ postMessage }) {
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const checkClick = (e) => {
      if (!e.target.closest(".emoji")) {
        setShowEmoji(false);
      }
    };
    window.addEventListener("click", (e) => checkClick(e));
    return () => {
      window.removeEventListener("click", (e) => checkClick(e));
    };
  }, []);

  const emojiPickerHandler = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const sendMessageHandler = (e) => {
    if (message.length > 0) {
      e.preventDefault();
      postMessage(message);
      setMessage("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={() => setShowEmoji(!showEmoji)} />
          {showEmoji && (
            <Picker theme="dark" onEmojiClick={emojiPickerHandler} />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendMessageHandler(e)}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -460px;
        /* background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3; */
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ContainerInput;
