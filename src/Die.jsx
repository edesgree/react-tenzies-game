//const [isMatch, setIsMatch] = React.useState(false)

export default function Die(props) {
  const dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<span className="dot">.</span>);
  }
  return (
    <div
      onClick={props.holdDice}
      className={props.isHeld ? 'isheld die' : 'die'}
    >
      {props.value}
      {dots}
    </div>
  );
}
