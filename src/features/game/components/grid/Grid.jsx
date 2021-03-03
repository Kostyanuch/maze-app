import React from 'react';
import uuid from 'react-uuid'
import styles from './Grid.module.css';
import {Tile} from "../tile/Tile";
import {useSelector} from "react-redux";
import {getPosition} from "../../gameSlice";

export function Grid ({ tiles }) {
  
  const position = useSelector(getPosition);
  
  return (
    <div className={styles.grid}>
      {tiles.map((tile, i) => <Tile
        number={i}
        withCircle={i === position}
        isPit={tile.settings.isPit}
        classNames={tile.class}
        key={uuid()}
      />)}
    </div>
  )
  
}
