import React, { useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');
socket.emit('init', { name: 'milo'});

function App() {
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  
  return (
    <div className="App">
      show
    </div>
  );
}

export default App;
