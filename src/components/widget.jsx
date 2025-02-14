import { useState } from "react";
import mic from '../assets/mic.png'

function Widget() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="container">
      <button
        type="button"
        className={`mic ${isListening ? "listening" : ""}`}
        onClick={() => setIsListening(!isListening)}
      >
       <img src={mic} /> 
      </button>
    </div>
  );
}

export default Widget;

