import React from 'react';

export default function Timer(props) {
  const [timer, setTimer] = React.useState(0);
  function timeCount() {}

  return <div className="time-tracking">Time: {timer}</div>;
}
