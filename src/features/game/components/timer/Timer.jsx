import React from "react";

export function Timer(props) {
  return (
    <span className='timer'>Resolved in {props.time} seconds</span>
  );
}
