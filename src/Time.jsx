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

  return <div className="time">
    {time}
    </div>;
}

export default Time;
