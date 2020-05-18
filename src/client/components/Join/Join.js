import React, { useState } from 'react';
import { Link } from "react-router-dom";
import randomWords from 'random-words';
import Create from '../Create/Create';

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const checkRoom = (e)=>{
    let tempRoom=room.split("-")
    console.log("tempRoom: "+tempRoom)
    if((tempRoom.length===3)&&(tempRoom[0]<=10&&tempRoom[0]>=1)&&(tempRoom[2]<=60&&tempRoom[2]>=5)){
      return;
    }
    else{
      setErrorMsg("Invalid Name or Room")
       e.preventDefault()
    }
  }
  return (
    <div>
    <div className="site-title">
    <h1>Matchy Words</h1>
      <div className="site-subtitle">a word matchy game</div>
    </div>
    <div className="joinOuterContainer">

    <Create/>

      <div className="joinInnerContainer">
        <h1 className="heading">Join Room</h1>
        <div>Join a game that your friend made</div>
        <div>
          <input maxLength="20" placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>


          <div>
            <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
          </div>
          <Link onClick={(e) => checkRoom(e)} to={`/chat?name=${name}&room=${room}`}>
            <button className={'button mt-20'} type="submit">Join Room</button>
          </Link>
          <p className="error-msg">{errorMsg}</p>



      </div>
    </div>
    </div>
  );
}
