import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
socket.emit("init", { name: "milo" });

function App() {
  const [msg, setMsg] = useState("");
  const [msgArr, setMsgArr] = useState([]);
  const scrollRef = useRef();

  const sendMsg = () => {
    socket.emit("send message", { name: "milo", message: msg });
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
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
              paddingLeft: "1rem",
              overflow: "auto",
            }}
          >
            {msgArr.map((elem) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  height: "2rem",
                }}
              >
                <p style={{ fontWeight: "bold", paddingRight: "1rem" }}>
                  {elem.name}{" "}
                </p>
                <p>{elem.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <input onChange={(e) => setMsg(e.target.value)}></input>
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}

export default App;
