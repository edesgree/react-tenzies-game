//const [isMatch, setIsMatch] = React.useState(false)

export default function Die(props) {
  return (
    <div>
      <button onClick={props.holdDice} className={props.isHeld ? 'isheld' : ''}>
        {props.value}
      </button>
    </div>
  );
}
