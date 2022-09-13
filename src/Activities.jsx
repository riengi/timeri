import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import './Activities.css';
import Activity from './Activity'

function Activities() {


  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);


  useEffect(() => {
    async function fetchMyAPI() {
      const received = await invoke("activities");
      const data = received.Ok;

      console.log(data);

      const today = await invoke('read_today_activities')
      console.log(today);


      data.forEach(element => {
        const sec = today[element.id]
        if (sec === undefined)
          element.sec = 0;
        else 
          element.sec = today[element.id]
      });

      console.log(data)

      setData(data);
      }
    
    fetchMyAPI();
  }, []);

  function activityClicked(d) {
    setActive(d.id);
  }

  return (
    <div className="activities">
      
      { data.map( (d, index) =>  
      
      <div key={index} onClick={(index) =>  activityClicked(d)}>
      <Activity 
        key={index}
        id={d.id}
        name={d.name}
        productive={d.productive} 
        active={active}
        sec={d.sec}
        />
        </div>

      )}

    </div>
    )
}

export default Activities;
