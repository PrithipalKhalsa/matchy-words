import React from 'react';

import './Card.css'
const Card = ({ gameWinner,overRide,overRideMinus,overRidePlus,name,word,score,color,isRoundWinner,isGameWinner,hasSent }) => {
  let sent=false
  if(hasSent.length>0){
    if(hasSent.find((user) => name===user.name)){
      sent=true
    }
  }
  return (
    <div>
   <img  value={(isGameWinner) ? "src/client/crown.png" :null }></img>
    <div key={name} className="card-row">
      {overRide &&<div className="card-column"><h1 onClick={()=>overRideMinus(name)} >{"\u2212"}</h1></div>}
      <div key={name} className={['player-block ' , (isRoundWinner) ? 'winner' : 'loser', (sent) ? 'sent' : 'unsent' ,(isGameWinner) ? 'game-winner' : 'game-loser'].join(' ')}
       style={{backgroundColor:color}}>
        <div className="player-block-top">
         <div className="player-block-name">{name}</div>
         {(isGameWinner) &&
           <img className="crown"  src={"src/client/crown.png"}></img>
         }
         <div className="player-block-score">{score}</div>
        </div>

          <h2>{word}</h2>
          <div>


          </div>
      </div>
        {overRide && <div className="card-column"><h1  onClick={()=>overRidePlus(name)}>{'\u002B'}</h1></div>}

    </div>

    </div>
  );
}

export default Card;
