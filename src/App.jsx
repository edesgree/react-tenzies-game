import React from 'react';
import Die from './components/Die';
import Timer from './components/Timer';
import { nanoid } from 'nanoid';
import Confetti from './components/Confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(1);
  const [time, setTime] = React.useState(0);
  const [timeRunning, setTimeRunning] = React.useState(false);
  const [timerInit, setTimerInit] = React.useState(true);
  const [bestTime, setBestTime] = React.useState(getBestTime() || 0);

  React.useEffect(() => {
    let interval;
    if (timeRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      });
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeRunning]);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameNb = dice.every((die) => die.value == firstValue);

    if (allHeld && allSameNb) {
      console.log('current time', time);
      console.log('best time', bestTime);
      setTenzies(true);
      setTimeRunning(false);
      if (time < bestTime || bestTime == 0) {
        saveBestTime(time);
      }
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  }
  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function handleRoll() {
    console.log('timerInit', timerInit);
    console.log('tenzies', tenzies);

    // click for first time at the begining of the game, we launch the timer
    if (timerInit) {
      setTimeRunning(true);
    }
    // when game is over, a click will set new dice, and reset/restart timer and roll counter
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setTime(0);
      setTimerInit(true);
      setTimeRunning(true);
      setRollCount(1);
    } else {
      setTimerInit(false);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDie();
        })
      );
      setRollCount((prevCount) => prevCount + 1);
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function saveBestTime(time) {
    localStorage.setItem('bestTime', time);
    setBestTime(time);
  }
  function getBestTime() {
    return localStorage.getItem('bestTime');
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      value={die.value}
    />
  ));
  /*
  function timeCount() {
    setInterval(
      setTimer((prevTime) => prevTime++),
      1000
    );

    return 2;
  }*/

  return (
    <main>
      {tenzies ? <Confetti /> : ''}

      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="board">{diceElements}</section>
      <footer>
        <Timer time={time} bestTime={bestTime} />
        <button className="roll" onClick={handleRoll}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <div className="roll-tracking">Rolls: {rollCount}</div>
      </footer>
    </main>
  );
}

export default App;
