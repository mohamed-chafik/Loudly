import React, { useState, useEffect } from 'react';

function Fetch({ sharedValue }) {
  const [news, setNews] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
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
          setNews(data.results); // Assuming the API returns an object with a `results` array
          console.log(data.results); 
          setLoading(false); // Set loading to false after data is fetched
          speak(data.results[0].title);
          console.log('speak')
         
        })
        .catch((error) => {
          setError(error.message); // Set error message if something goes wrong
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [sharedValue]); // Run whenever `sharedValue` changes


 useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]); // Set default voice
            }
        };

        // Load voices initially
        loadVoices();

        // Listen for the 'voiceschanged' event
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Cleanup
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const speak = (text) => {
        if (selectedVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice; // Set the selected voice
            utterance.lang = selectedVoice.lang; // Set the language
            utterance.rate = 1; // Speed of speech
            utterance.pitch = 1; // Pitch of speech
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Please select a voice and enter text.');
        }
    };
};
export default Fetch;
