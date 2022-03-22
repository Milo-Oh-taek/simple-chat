import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: URL(/images/indexBG.jpg) no-repeat center;
  background-size: 100% 100%;
`;

const NicknamePopup = styled.div`
  position: absolute;
  width: 50vw;
  height: 40vh;
  background-color: #f7f7f7;
  text-align: center;
  opacity: 0.8;
  z-index: 10;
`;

const Home = () => {
  let navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [nicknameChk, setNicknameChk] = useState(false);
  const [chatRoom, setChatRoom] = useState('');

  const nicknameHandler = () => {
    setNicknameChk(true);
  }

  const joinHandler = () => {
    navigate(`/${chatRoom}/${nickname}`);
  }

  return (
    <>
      <DivContainer>
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "25%",
          }}
        >
          {nicknameChk? (
            <NicknamePopup>
            <h1>Chat Rooms</h1>
            <div>
              <input type='radio' value='fashion' checked={chatRoom === 'fashion'} onChange={(e) => setChatRoom(e.target.value)} />Fashion
              <input type='radio' value='sports' checked={chatRoom === 'sports'} onChange={(e) => setChatRoom(e.target.value)} />Sports
            </div>
            <div>
              <button onClick={joinHandler}>Join</button>
            </div>
          </NicknamePopup>
          ) : (
            <NicknamePopup>
            <h1>Choose your nickname</h1>
            <input
              onChange={(e) => setNickname(e.target.value)}
              style={{ margin: "3rem" }}
            ></input>
            <div>
              <button onClick={nicknameHandler}>Select</button>
            </div>
          </NicknamePopup>
          )}
          
        </div>
      </DivContainer>
    </>
  );
};

export default Home;
