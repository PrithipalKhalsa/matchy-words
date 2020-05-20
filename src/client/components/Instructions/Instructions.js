import React, {useState,useEffect} from 'react';

import Report from '../Report/Report';

import './Instructions.css';

const Instructions = ({room, wins}) => {



  return (
    <div className="instruction-wrapper">
      <div className="instruct">
        <h4>How to play:</h4>
        <p>1. Share this room id ({room}) with your friends</p>
        <p>2. On each round type the word that relates to the words on the board. There is a timer so think fast.</p>
        <p>3. Once words have matched those players will get points and a new round will begin.</p>
        <p>4. The first player(s) to {wins} points win</p>
        <h4>Other Rules:</h4>
        <p>1. Words may not be repeated in a round, but they may be repeated in a game</p>
        <p>2. If words are very close (i.e. 'NYC' and 'New York City') you may use the manual over ride feature to award points </p>
      </div>
      <Report/>
    </div>

  );
}
export default Instructions;
