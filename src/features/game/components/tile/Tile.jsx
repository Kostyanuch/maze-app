import React from "react";
import styles from "./Tile.module.css";

export function Tile(props) {
  const classNames = `${styles.tile} ${styles[props.classNames]} ${props.isPit && styles.pit}`;
  return (
    <div className={classNames} key={props.number}>
      {props.withCircle && <span className={styles.ball}/>}
    </div>
  );
}
