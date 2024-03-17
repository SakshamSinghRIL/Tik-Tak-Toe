import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

function getGameStatus(squares){
    let winCombs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i=0;i<winCombs.length;i++){
           let winningCombo = winCombs[i];
           let s1 = winningCombo[0];
           let s2 = winningCombo[1];
           let s3 = winningCombo[2];
   
           if (squares[s1] != null && squares[s1] == squares[s2] && squares[s2] == squares[s3]) {
               return squares[s1];
           }
    }
    return null;
}

class Board extends React.Component {
    handleBoxClick(i) {
        this.props.handleForBoxClick(i);
    }
    renderSquare(i) {
        return (
            <button onClick={() => this.handleBoxClick(i)}>{this.props.boxes[i] == null ? "" : this.props.boxes[i]}</button>
        )
    }
    render() {
        return (
            <div className='board'>
                <div className='title'>
                    My tik-tak-toe Game
                </div>
                <div className='content'>
                    <div className='ttt'>
                        <div className='row'>
                            {this.renderSquare(0)}
                            {this.renderSquare(1)}
                            {this.renderSquare(2)}
                        </div>
                        <div className='row'>
                            {this.renderSquare(3)}
                            {this.renderSquare(4)}
                            {this.renderSquare(5)}
                        </div>
                        <div className='row'>
                            {this.renderSquare(6)}
                            {this.renderSquare(7)}
                            {this.renderSquare(8)}
                        </div>


                    </div>

                </div>
            </div>
        )
    }
}

class Display extends React.Component {
    moveHistory(i){
        this.props.handlerForHistory(i);
    }
    
    render() {

        let gameTitle;
        if(this.props.gameStatus == null){
            gameTitle = "Next move for " + (this.props.stepNumber % 2 == 0? "X" : "O");

        }else{
            if(this.props.gameStatus == "draw"){
                gameTitle = "It's a draw";
            }else{
                gameTitle = this.props.gameStatus + " wins";
            }
        }

        let buttons = [];
        for(let i=0;i<=this.props.stepNumber;i++){
            let insertButton = null;
            if(i == 0){
               insertButton = <button onClick={() => this.moveHistory(i)}>Goto Start</button>
            }else{
                insertButton = <button onClick={() => this.moveHistory(i)}>Go to Next Step#{i}</button>
            }
            buttons.push(insertButton);
        }
        return (
            <div className='display'>
                <div className='title'>
                   {gameTitle}
                </div>
                <div className='content'>
                    <div className='history'>
                       {buttons}
                    </div>
                </div>

            </div> 
        )
    }
}
class TTT extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                [null, null, null, null, null, null, null, null, null],
            ],
            stepNumber: 0,
            gameStatus: null

        }
    }
    moveToStep(i){
        let oldHistory = this.state.history.slice(0, i + 1);
         let currentSquares = oldHistory[oldHistory.length - 1];
         let newGameStatus = getGameStatus(currentSquares);

        this.setState({
            history: oldHistory,
            stepNumber: i,
            gameStatus: newGameStatus
        })
    }

    handleSquareClick(i) {
           let oldHistory = this.state.history.slice();
           let currentSquares = oldHistory[oldHistory.length-1].slice();

           if(currentSquares[i] != null || this.state.gameStatus != null){
               return;
           }
           currentSquares[i] = this.state.stepNumber % 2 == 0 ? 'X' : 'O';
           oldHistory.push(currentSquares);
           let newGameStatus = getGameStatus(currentSquares);
           if (this.state.stepNumber == 8 && newGameStatus == null) {
               newGameStatus = "draw";
           }

           this.setState({
               history : oldHistory,
               stepNumber : this.state.stepNumber + 1,
               gameStatus : newGameStatus
           })
    }
    render() {

       // let squares = this.state.history[this.state.history.length - 1];
       let totalSquares = this.state.history[this.state.history.length-1];
        return (
            <>
                <Board handleForBoxClick={(i) => this.handleSquareClick(i)} boxes={totalSquares}/>
                <Display stepNumber={this.state.stepNumber} gameStatus={this.state.gameStatus}  handlerForHistory={(i) => this.moveToStep(i) }/>

            </>
        );
    }
}


ReactDOM.render(<TTT />, document.getElementById("root"));