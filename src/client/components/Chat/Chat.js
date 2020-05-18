import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from 'query-string';

import Board from '../Board/Board';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Instructions from '../Instructions/Instructions';
import Report from '../Report/Report';

import './Chat.css';

let socket;
//location==url params
const Chat = ({ location }) => {
  // let hasSent=[]
  const [maxTime,setMaxTime]=useState('');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [input, toggleInput] = useState(false);
  const [roundWinner, setRoundWinner]=useState(false);
  const [gameWinner, setGameWinner]=useState(false);
  const [hasSent,setHasSent]=useState([]);

  const ENDPOINT = 'https://matchywords2020.uc.r.appspot.com/';
  // const ENDPOINT = 'http://localhost:5000/';
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);
    setMaxTime(room.split("-")[2]);


    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("newBoard", ({ users,input,roundWinner,endGame,resetSent }) => {
      setUsers(users);
      console.log(users)
      if(roundWinner !== undefined){
      setRoundWinner(roundWinner)
      setHasSent([])
      setGameWinner(endGame)
      console.log("gamewinner "+endGame);

      }
      if(resetSent !== undefined){
        toggleInput(false);
      }

    });

    socket.on('sent', allUsers => {
      setHasSent(allUsers)
    });

    socket.on("toggleInput", ({ input }) => {
      toggleInput(input);
    });


    socket.on('timer', ({time})=> {
      if (time<=0){
        setTime('');
      }
      else
        setTime(time);
    });

  }, []);


  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      console.log(users[0].wordsUsed)
      if(!users[0].wordsUsed.includes(message)){
        toggleInput(!input);
        socket.emit('sendMessage', message.toLowerCase(), () => setMessage(''));
      }else{
        alert('that word has been used')
      }
    }
  }

  const startTimer = (event) => {
    console.log("max: "+maxTime);

    console.log("button");
     event.preventDefault();
      socket.emit('startTimer',maxTime);

  }
  const addUserSent=(user)=>{
    // let i= users.findIndex((userI) => user===userI.name)
    // users[i].hasSent=true
    console.log(user)
    console.log(users[0].wordsUsed)
  }

  const resetRound = (event) => {
    event.preventDefault();
    startTimer(event)
    socket.emit('resetRound');
  }
  const resetGame = (event) => {
    event.preventDefault();
    startTimer(event)
    socket.emit('resetGame');
  }

  // <InfoBar room={room} />
  // <Messages messages={messages} name={name} />
  return (
<div>
    <div className="app-board">
      <Board gameWinner={gameWinner} time={time} socket={socket} users={users} hasSent={hasSent} room={room} sendMessage={sendMessage}/>
          { input
          ?<Input  message={message} setMessage={setMessage} sendMessage={sendMessage} />
          :null
          }
          {roundWinner
            ?<div>
              {!gameWinner
                ?<button className="sendButton" onClick={e => resetRound(e)}>Next Round</button>
                :<button className="sendButton" onClick={e => resetGame(e)}>Play Again</button>
              }</div>
            :<div>{ (!input&&time=== '') &&

              <button className="sendButton startButton" onClick={e => startTimer(e)}>Start Timer</button>
         }</div>
        }
        <p className="board">Input a word that relates to the words on the board. Don't repeat words in a round.</p>
    </div>
    <Instructions room={room} wins={room.split("-")[0]} />
    <Report/>

    </div>
  );
}

export default Chat;
