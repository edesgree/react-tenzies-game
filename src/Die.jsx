//const [isMatch, setIsMatch] = React.useState(false)

export default function Die(props) {
  const dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<span className="dot"></span>);
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
