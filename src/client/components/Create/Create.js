import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";

import randomWords from 'random-words';

import './Create.css';

const Create=()=> {
  const [time, setTime] = useState(20);
  const [wins, setWins] = useState(5);
  const [name, setName] = useState(5);
  const [errorMsg, setErrorMsg] = useState('');
  const defaultRoom=randomWords({exactly: 1,maxLength: 5})
  let roomArr=[wins,defaultRoom,time].join('-')

  const createRoom =(e)=>{

    if(!name||(time<5||time>60)||((wins<1||wins>10))){
      setErrorMsg("Invalid Name or game settings")
      e.preventDefault()
    }
  }
  return (

      <div className="joinInnerContainer">
        <h1 className="heading">Create Room</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
      <div>
        <div className="create-options">
          <label htmlFor="time">Time</label>
           <input defaultValue={20} type="number" id="time" name="quantity" min="5" max="60"  onChange={(event) => setTime(event.target.value)}/>
           <label htmlFor="rounds">wins</label>
           <input defaultValue={5} type="number" id="rounds" name="quantity" min="1" max="10"onChange={(event) => setWins(event.target.value)}/>
        </div>
          <Link onClick={(e) =>createRoom(e)} to={`/chat?name=${name}&room=${roomArr}`}>
            <button className={'button mt-20'} type="submit">Create Room</button>
          </Link>
          <p className="error-msg">{errorMsg}</p>

          </div>
        </div>

  );
}
export default Create
