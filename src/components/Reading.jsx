import { useEffect, useState } from 'react';

function Reading({ fetchedData, sharedValue }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load available voices and set the default voice
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[1]); // Set default voice
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

  // Handle changes to sharedValue (pause, continue, stop)
  useEffect(() => {
    if (sharedValue === "pause") {
      window.speechSynthesis.pause();
      console.log('pause')
    } else if (sharedValue === "continue") {
      window.speechSynthesis.resume();
      console.log('continue')
    } else if (sharedValue === "stop") {
      window.speechSynthesis.cancel();
      console.log('stop')
    }
  }, [sharedValue]);

  // Speak the fetchedData when it changes
  useEffect(() => {
    if (fetchedData && selectedVoice) {
      speak(fetchedData);
      console.log(fetchedData);
    }
  }, [fetchedData, selectedVoice]);

  // Function to speak the text
  const speak = (text) => {
    if (!text || !Array.isArray(text)) {
      console.error('Invalid fetchedData: Expected an array of text objects.');
      return;
    }

    text.forEach((item, index) => {
      const utterance = new SpeechSynthesisUtterance(item.description);
      utterance.voice = selectedVoice; // Set the selected voice
      utterance.lang = selectedVoice.lang; // Set the language
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech

      // Queue utterances to avoid overlap
      window.speechSynthesis.speak(utterance);
    });
  };

  return null; // or return some JSX if needed
}

export default Reading;
