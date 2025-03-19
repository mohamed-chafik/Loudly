import { useEffect, useState } from 'react';

function Reading({ fetchedData }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

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

  useEffect(() => {
    if (fetchedData && selectedVoice) {
      speak(fetchedData);
      console.log(fetchedData)
    }
  }, [fetchedData, selectedVoice]);

  const speak = (text) => {
    if (!text || !Array.isArray(text)) {
      console.error('Invalid fetchedData: Expected an array of text objects.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

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

}

export default Reading;
