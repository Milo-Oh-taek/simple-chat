import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const params = useParams();
  const chatroom = params.room;
  const nickname = params.nickname;
  const scrollRef = useRef();

  const [msg, setMsg] = useState("");
  const [msgArr, setMsgArr] = useState([]);
  

  const sendMsg = (e) => {
    e.preventDefault();
    socket.emit("send message", { name: "milo", message: msg, chatroom }, setMsg(""));
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    socket.emit("init", chatroom);
    console.log(chatroom);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log("scroll");
  }, [msgArr]);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setMsgArr((msgArr) => msgArr.concat(message));
    });
  }, []);

  return (
    <div className="App">
      <h1>chat</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "60vw",
            backgroundColor: "lightblue",
            height: "80vh",
          }}
        >
          <div
            ref={scrollRef}
            style={{
              height: "100%",
              // padding: "1rem",
              marginBottom: "2rem",
              overflowY: "scroll",
              wordBreak: 'break-all'
            }}
          >
            {msgArr.map((elem) => (
              <div
                style={{
                  display: "flex",
                  textAlign:'center',
                  height: "auto",
                  margin: '1rem'
                }}
              >
                <div style={{ fontWeight: "bold", width:'15%' }}>
                  {elem.name}{" "}
                </div>
                <div style={{textAlign:'left', width:'85%'}}>{elem.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form
        onSubmit={sendMsg}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div
          style={{ width: "60vw", display: "flex", justifyContent: "center" }}
        >
          <input
            type='text'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            style={{ width: "100%", height:'2rem' }}
          ></input>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
