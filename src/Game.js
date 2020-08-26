import React from 'react';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pause: false,
      height: props.height,
      width: props.width,
      board: Array(props.height * props.width).fill(false),
    }
  }

  play = () => {
    var board = this.state.board.slice()
    for (var cell = 0; cell < board.length; cell++) {
      board[cell] = nextState(cell, this.state.board, this.state.width)
    }
    this.setState({ board: board })
  }

  start = () => {
    if (this.state.pause) return
    this.play()
    setTimeout(this.start, 300)
  }

  handleClick(i) {
    var board = this.state.board.slice()
    board[i] = true
    this.setState({ board: board})
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ pause: !this.state.pause })}>Play</button>
        <button onClick={() => this.start()}>Start</button>
        <div className="game">
          <Board onClick={(i) => this.handleClick(i)} height={this.state.height} width={this.state.width} board={this.state.board}/>
        </div>
      </div>
    )
  }
}

function Board(props) {
  var board = [];
  for (let row = 0; row < props.height; row++) {
    var rows = [];

    for (let column = 0; column < props.width; column++) {
      rows.push(<Square onClick={() => props.onClick(column + row * props.width)} fill={props.board[column + row * props.width]} key={column + row * props.width} value={countNeightboards(column + row * props.width, props.board, props.width)}/>)
    }

    board.push(
      <div key={row} className="board-row">
        {rows}
      </div>
    )
  }

  return (
    <div className="game-board">
      {board}
    </div>
  )
}

function Square(props) {
  var style = 'square'
  if (props.fill) {style = 'filled-square'}
  return (
    <button className={style} onClick={props.onClick}></button>
  );
}

export default Game

function nextState(cell, board, width) {
  var neighboards_count = countNeightboards(cell, board, width)
  if(neighboards_count == 3) return true
  else if(board[cell] && neighboards_count == 2 ) return true
  else return false
}

function countNeightboards(cell, board, width) {
  var count = 0
  var evaluate_line, evaluate_col;

  for (var line = -1; line <= 1; line++) {
    for (var column = -1; column <= 1; column++) {
      evaluate_line = Math.floor(cell / width) + line
      evaluate_col = (cell % width) + column
      if(evaluate_line >= 0 && evaluate_line < board.length / width && evaluate_col >= 0 && evaluate_col < width && (evaluate_col + evaluate_line * width != cell)) {
        count += board[evaluate_col + evaluate_line * width]
      }
    }
  }

  return count
}
