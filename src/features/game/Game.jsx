import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {getEntities, changePosition, setPosition, fetchTiles, isSolved} from "./gameSlice";
import {Grid} from "./components/grid/Grid";
import {Timer} from "./components/timer/Timer";

import styles from './Game.module.css';

export function MazeGame () {
  const dispatch = useDispatch();
  
  const getTiles = () => dispatch(fetchTiles());
  
  const entities = useSelector(getEntities);
  const solved = useSelector(isSolved);
  
  const [startFlag, setStartFlag] = useState(false);
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let timer;
    if (!solved) {
      timer = setTimeout(() => {
        if(startFlag) {
          const newTime = time + 1;
          setTime(newTime);
        }}, 1000);
    }
    return () => clearTimeout(timer);
  });
  
  
  const move = (event) => {
    event.stopPropagation();
    if (solved) return;
    const { keyCode } = event;
    dispatch(changePosition(keyCode));
  }
  
  const startNew = () => {
    getTiles(); //TODO load tiles for current level
    dispatch(setPosition(0));
    setStartFlag(true);
    setTime(0);
  }
  
  return (
    <div className={styles.maze} onKeyUp={move} tabIndex="1">
      <button onClick={startNew} className={styles.primary}>Start New</button>
      {!solved && <Timer time={time}/>}
      {solved && <span className={styles.greeting}>Awesome! Maze solved in {time} seconds!</span>}
      {startFlag && <Grid tiles={entities} />}
    </div>
  )
  
}
