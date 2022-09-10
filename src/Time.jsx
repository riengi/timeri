import { useState, useEffect } from "react";
import './Time.css';

function getTime() {
  return new Date().toLocaleTimeString();
}

function Time() {

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    // cleanup
    return () => clearInterval(interval);
  });

  // Get date
  var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0] + " (" + days[date.getDay()].toLowerCase() + ") " + "UTC+" + (-date.getTimezoneOffset() / 60);

  return <div className="time">
    <div>
      {time}
    </div>
    <div className="date">
      {dateStr}
    </div>
  </div>;
}

export default Time;
