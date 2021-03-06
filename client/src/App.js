import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:room/:nickname" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
