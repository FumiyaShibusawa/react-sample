import React, { Component } from 'react'
import ReactDOM from 'react-dom'


// functional component
function Square(props) {
  return(
    <div className="button-cont">
      <button className="square" onClick={ props.onClick } >
      { props.value }
      </button>
    </div>
  )
}

class Board extends Component {
  renderSquare(i){
    return (
      <Square
        value = { this.props.squares[i] }
        onClick = { () => this.props.onClick(i) }
      />
    );
  }

  render(){
    return (
      <div className="game-board">
        <div className="board-grids">
          <div className="board-row">
            { this.renderSquare(0) }
            { this.renderSquare(1) }
            { this.renderSquare(2) }
          </div>
          <div className="board-row">
            { this.renderSquare(3) }
            { this.renderSquare(4) }
            { this.renderSquare(5) }
          </div>
          <div className="board-row">
            { this.renderSquare(6) }
            { this.renderSquare(7) }
            { this.renderSquare(8) }
          </div>
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // コピー
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    if(step === 0){
      this.setState({
        history: [
          {
            squares: Array(9).fill(null),
          }
        ],
      })
    }
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const disabled = history.length === 1 ? "disabled" : "";
    const moves = history.map((step, move) => {
      const desc = move ?
        "Go to move #" + move :
        "Go to game start";
      const current_step = this.state.stepNumber === move ? "current" : "";
      return(
        <li key = { move }>
          <button className={ current_step } onClick = { () => this.jumpTo(move) } disabled= { disabled }>{ desc }</button>
        </li>
      );
    });

    let status;
    if(winner){
      status = "Winner: " + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <Board
          squares = { current.squares }
          onClick = { (i) => this.handleClick(i) }
        />
        <div className="game-info">
          <p>{ status }</p>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById("game")
);

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
      return squares[a];
    }
  }
  return null;
}
