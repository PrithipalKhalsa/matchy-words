import React, {useState,useEffect} from 'react';



const Timer = ({time, setTime,socket}) => {
  const [overRideNames,setOverRideNames]=useState([]);
  const [overRide,setOverRide]=useState(false);

  useEffect(() => {
    socket.on('timer', ({time})=> {
      if (time<=0){
        setTime('');
      }
      else
        setTime(time);
    });

  }, []);

  const startTimer = (event) => {
    console.log("button");
     event.preventDefault();
      socket.emit('startTimer');
  }

  return (
    <div className="Timer">
    <div>{time}</div>
    <button className="sendButton" onClick={e => startTimer(e)}>Start Timer</button>
    </div>
  );
}
export default Timer;
