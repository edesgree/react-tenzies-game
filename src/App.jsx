import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from './Confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    console.log('Dice state changed');
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameNb = dice.every((die) => die.value == firstValue);

    console.log('allisheld', allHeld);
    console.log('allsameNB', allSameNb);

    if (allHeld && allSameNb) {
      setTenzies(true);
      console.log('You won!');
    }
  }, [dice]);
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    console.log(newDice);
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
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    console.log('hello', id);
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      value={die.value}
    />
  ));
  return (
    <main>
      {tenzies ? <Confetti /> : ''}

      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="board">{diceElements}</section>
      <button className="roll" onClick={handleRoll}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;
