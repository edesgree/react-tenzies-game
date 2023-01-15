import React from 'react';
import Die from './components/Die';
import Timer from './components/Timer';
import { nanoid } from 'nanoid';
import Confetti from './components/Confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameNb = dice.every((die) => die.value == firstValue);

    if (allHeld && allSameNb) {
      setTenzies(true);
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
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
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
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      value={die.value}
    />
  ));

  function timeCount() {
    setInterval(
      setTimer((prevTime) => prevTime++),
      1000
    );

    console.log('time');
  }
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
        <Timer timer={timer} />
        <button className="roll" onClick={handleRoll}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <div className="roll-tracking">Rolls: {rollCount}</div>
      </footer>
    </main>
  );
}

export default App;
