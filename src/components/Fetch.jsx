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
    console.log("yes")
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(news[0].description);
      utterance.lang = "en-US"; // Set the language
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech
      window.speechSynthesis.speak(utterance);
      console.log("ysw")
    } else {
      alert("Your browser does not support the Web Speech API.");
    }
  };


};

export default Fetch;
