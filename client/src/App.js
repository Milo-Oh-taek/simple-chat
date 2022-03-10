import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
socket.emit("init", { name: "milo" });

function App() {
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setMsgArr((msgArr) => msgArr.concat(message));
    });
  }, []);

  const [msg, setMsg] = useState("");
  const [msgArr, setMsgArr] = useState([]);

  const sendMsg = () => {
    socket.emit("send message", { name: "milo", message: msg });
  };

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
          {msgArr.map((elem) => (
            <div>
              <p style={{ fontWeight: "bold" }}>{elem.name}</p>
              <p>{elem.message}</p>
            </div>
          ))}
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
