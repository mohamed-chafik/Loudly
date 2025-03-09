import React, { useState, useEffect } from 'react';

function Fetch({ sharedValue }) {
  const [news, setNews] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors
  useEffect(() => {
    if (sharedValue) {
      // Replace with your API endpoint
      fetch(`https://newsdata.io/api/1/latest?apikey=pub_67392dabd0d854336968378a2e667405c5a83&q=${sharedValue}&language=en`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
          
        })
        .then((data) => {
          console.log(data); // Log the fetched data
          setNews(data.results); // Assuming the API returns an object with a `results` array
          setLoading(false); // Set loading to false after data is fetched
          speak(); 
        })
        .catch((error) => {
          setError(error.message); // Set error message if something goes wrong
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [sharedValue]); // Run whenever `sharedValue` changes

const speak = () => {


  if ('speechSynthesis' in window) {
    // Check if voices are already loaded
  let voices = window.speechSynthesis.getVoices(); 
  if(voices === 0){
 window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          console.log('Voices loaded:', voices);
          startSpeaking(voices); // Call the function to start speaking
        } 
      };
  }} else {
      console.log('Voices already loaded:', voices);
      startSpeaking(voices); // Call the function to start speaking

  };

// Helper function to start speaking
const startSpeaking = (voices) => {
  const utterance = new SpeechSynthesisUtterance(news[0].description);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.voice = voices.find(voice => voice.lang === "en-US"); // Optionally set a specific voice
  utterance.onstart = () => console.log('Speech started');
  utterance.onend = () => console.log('Speech ended');


  window.speechSynthesis.speak(utterance);
};

};
};
export default Fetch;
