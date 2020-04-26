import React, {useState,useEffect} from 'react';


import './Board.css';
import Card from '../Card/Card';

const Board = ({gameWinner, time, users ,hasSent,room,socket}) => {
  const [overRideNames,setOverRideNames]=useState([]);
  const [overRide,setOverRide]=useState(false);

  useEffect(() => {
    if(time!=='')
    setOverRide(false)
  });
const overRidePlus=(name)=>{
  if(overRide===true){
    socket.emit('overRidePlus', name);
  }
}
const overRideMinus=(name)=>{
  if(overRide===true){
    socket.emit('overRideMinus', name);
  }
}

  return (
    <div className="Board">
      {
        users
          ? (
            <div>
            <h1 className="heading">Mind Meld</h1>
            <div class="subtitle">
              <h5>Room ID: {room}</h5>
                {time=== ''&&
                <div className="over-ride-block">
                  {!overRide
                    ?<button className="over-ride-btn" onClick={() => setOverRide(!overRide)}>OverRide</button>
                    :null
                  }
              </div>
              }
            </div>
              <div className="app-board">
              {gameWinner&&<div>Winners:</div>}
                {users.map(({name,word,score,color,isRoundWinner,isGameWinner}) =>
                   <div key={name}><Card overRide={overRide} gameWinner={gameWinner} overRideMinus={overRideMinus} overRidePlus={overRidePlus}
                   name={name} word={word} score={score} color={color} isRoundWinner={isRoundWinner}
                   isGameWinner={isGameWinner} hasSent={hasSent}/></div>)}
                <div>
                </div>
              </div>

            </div>
          )
          : null
      }
    </div>
  );
}
export default Board;
