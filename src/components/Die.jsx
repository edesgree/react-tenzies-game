import React from 'react';

export default function Die(props) {
  const dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<span key={i} className="dot"></span>);
  }
  return (
    <div
      value={props.value}
      onClick={props.holdDice}
      className={`${props.isHeld ? 'isheld' : ''} die value-${props.value}`}
    >
      {dots}
    </div>
  );
}
