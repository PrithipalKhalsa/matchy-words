import React from 'react';

import './Timer.css';

const Timer = ({ time }) => (
  <div className="clock">
    <div className={['countdown', ([5,3,1].includes(time)) ? 'animate__heartBeat': ''].join(' ')}>{time}</div>
  </div>
)

export default Timer;
