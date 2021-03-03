import React from 'react';
import './App.css';
import {MazeGame} from "./features/game/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Maze App</h1>
      </header>
      <MazeGame />
    </div>
  );
}

export default App;
