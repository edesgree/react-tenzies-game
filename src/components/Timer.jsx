import React from 'react';

export default function Timer(props) {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className="time-tracking">
      Time: {millisToMinutesAndSeconds(props.time)}
    </div>
  );
}
