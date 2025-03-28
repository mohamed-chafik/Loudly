import { useState, useRef, useEffect } from "react";
import mic from '../assets/mic.png';
function Widget({ sharedValue, setSharedValue }){
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState();
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support the Web Speech API');
      return;
    }

    // Initialize the recognition object
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    setRecognition(recognition);

    // Cleanup on unmount
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      updateValue();
      console.log(transcript)
    }
  };
  const updateValue = () => {

    if(transcript === undefined){
      const timer = setTimeout(() => {
        startListening()
      }, 2000); // 2000 milliseconds = 2 seconds
    }else{   

    const trimmedValue = transcript.trim(); // Trim leading and trailing whitespace
    setSharedValue(trimmedValue); // Update the state with the trimmed value
    }
  };
  return (
    <div className="container">
   <button className={`mic ${isListening ? "listening" : ""}`} type="button" onClick={isListening ? stopListening : startListening}><img src={mic} /></button> 


    </div>
  );
}

export default Widget;

