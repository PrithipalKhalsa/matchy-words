import React, {useState,useEffect} from 'react';


import './Board.css';
import Card from '../Card/Card';
import Timer from '../Timer/Timer';

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
    <div className="board">
      {
        users
          ? (
            <div>
            <h1 className="heading">Matchy Words</h1>
            <div className="subtitle">
              <div className="roominfo">
                <p>Room ID: {room}</p>
                <p>Points to win: {room.split("-")[0]}</p>
              </div>
                {time=== ''&&
                <div className="over-ride-block">
                  {!overRide
                    ?<button className="over-ride-btn" onClick={() => setOverRide(!overRide)}>OverRide</button>
                    :null
                  }
              </div>
              }
                {time != ''&&
              <Timer time={time}/>}
            </div>
              <div>
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
