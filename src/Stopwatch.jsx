import { useState, useEffect } from 'react';
import './Activities.css'

function getTimeStr(h, m, s) {

  const secStr = s.toString().padStart(2, "0");
  const minStr = m.toString().padStart(2, "0");
  const hourStr = s.toString().padStart(2, "0");

  return hourStr + ":" + minStr + ":" + secStr;
}

function secToTime(s) {
  const hours = Math.floor(s/3600);
  const mins = Math.floor((s % 3600)/60);
  const secs = Math.floor(s % 60);

  return hours.toString().padStart(2,"0") + ":" + mins.toString().padStart(2,"0") + ":" + secs.toString().padStart(2, "0");
}

function Stopwatch(props) {

  const [sec, setSec] = useState(props.sec)

    useEffect(() => {

  if (props.active !== props.id)  return;
      const interval = setInterval(() => {
        setSec(sec+1);
        secAdded++;

      }, 1000)

      return () => clearInterval(interval);

    })

  return (
    <div className="stowatch">

      {secToTime(sec)}


    </div>
  );
}

export default Stopwatch;