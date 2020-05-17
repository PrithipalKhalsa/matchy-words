import React, {useState,useEffect} from 'react';


import './Instructions.css';

const Instructions = ({room, wins}) => {



  return (
    <div className="board">
      <div className="instruct how-to-play">
        <h2>How to play:</h2>
        <p>1. Share this room id ({room}) with your friends</p>
        <p>2. On each round type the word that relates to the words on the board. There is a timer so think fast.</p>
        <p>3. Once words have matched those players will get points and a new round will begin.</p>
        <p>4. The first player(s) to {wins} points win</p>
      </div>
      <div className="instruct other-rules">
        <h3>Other Rules:</h3>
        <p>1. Words may not be repeated in a round, but they may be repeated in a game</p>
        <p>2. If words are very close (i.e. 'NYC' and 'New York City') you may use the manual over ride feature to award points </p>
      </div>
      <div className="instruct colors-block">
      <h4>Colors</h4>
        <p className="sent">Blue outline: player has submitted a word</p>
        <p  className="winner">Yellow outline: player has won that round</p>
        <p  className="game-winner">Solid yellow: player has won the game</p>
        <p></p>
      </div>
    </div>

  );
}
export default Instructions;
