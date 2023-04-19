import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import noAvatar from "../../assets/noavatar.jpg";
import axios from '../../axios';

function CurrentUser() {
  const currentUser = useSelector((state) => state.auth.data);
  const [modalIsOpen,setModalIsOpen] = React.useState(false);
  const [uploadImage,setUploadImage] = React.useState("");
  const imageInputRef = React.useRef(null);

  React.useEffect(()=>{
    if(currentUser){
      setUploadImage(currentUser.avatarUrl);
    }
  },[currentUser])
  
  const uploadFile = () =>{
    const file = imageInputRef.current.files[0];
    const formData = new FormData();
    formData.append('avatar',file);
    axios.post('/avatars',formData).then(res=>{
      setUploadImage(res.data.url);
    })
  }

  const sendNewAvatar = () =>{
    axios.post('/avatar-update',{
      url: uploadImage
    }).then(res=>{
      setModalIsOpen(false);
    })
  }

  const closeModal = () =>{
    setUploadImage(currentUser.avatarUrl);
    setModalIsOpen(false);
  }

  return (
    <>
      <Container>
        <div className="avatar" onClick={()=>setModalIsOpen(true)}>
          <img src={uploadImage.length > 0 ? `http://localhost:8000${uploadImage}` : noAvatar} alt="avatar" />
        </div>
        <div className="username">
          <h2>{currentUser?.username}</h2>
        </div>
      </Container>
      {modalIsOpen && 
      (
      <Modal>
        <div className="modal-bg"></div>
        <div className="modal-body">
          <div className="change-avatar">
            <input type="file" hidden ref={imageInputRef} onChange={uploadFile}/>
            <img src={uploadImage.length > 0 ? `http://localhost:8000${uploadImage}` : noAvatar} alt="" onClick={()=>imageInputRef.current.click()}/>
          </div>
          <button onClick={sendNewAvatar}>Сохранить</button>
          <button className="change-avatar__close" onClick={closeModal}>Отмена</button>
        </div>
      </Modal>
      )}
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
      width: 4rem;
      object-fit:cover;
      border-radius:50%;
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
  .modal-bg{
    background-color: #131324;
    width: 100vw;
    height: 100vh;
    position:absolute;
    top:0;
    left:0;
    opacity:0.7;
  }
  .modal-body {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    height: auto;
    width: auto;
    display: flex;
    flex-direction: column;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
    background-color: #000000;
    .change-avatar{
      margin-bottom:2rem;
      img{
        height: 10rem;
        object-fit:cover;
        border-radius:50%;
        width: 10rem;
      }
    }
    button{
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
    .change-avatar__close{
      margin-top:1rem;
      background-color:red;
    }
  }
`;

export default CurrentUser;
