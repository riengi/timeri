import './Activities.css';
import Stopwatch from './Stopwatch'

function Activities(props) {

  let className = "activity"
  if (props.active === props.id) {
    className += " activity-active"
  }

  return (
    <div className={className}>

  <div>
      {props.name}
      </div>
      <div>
        
      </div>
        <Stopwatch id={props.id} active={props.active} hour="0" min="0" sec="0" />

      </div>
  );
}

export default Activities;
