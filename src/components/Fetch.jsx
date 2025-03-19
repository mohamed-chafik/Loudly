import { useEffect, useState } from 'react';
import validator from "validator";
function Fetch({ sharedValue, fetchedData, setFetchedData }) {
  const [news, setNews] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors
  const commands = ["continue", "pause", "stop"];



useEffect(() => {

  // Check if sharedValue is in the commands array
  if (commands.includes(sharedValue)) {
    return; // Exit early if sharedValue is a command
  }

  if (sharedValue) {
    setLoading(true); // Set loading to true when starting to fetch
    setError(null); // Reset error state

    // Replace with your API endpoint
    fetch(`https://newsdata.io/api/1/latest?apikey=pub_75313e52707842619e32870f9c79a7dbcafda&q=${sharedValue}&language=en`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.results); // Assuming the API returns an object with a `results` array
        setFetchedData(data.results); // Update fetchedData in the parent component
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Set error message if something goes wrong
        setLoading(false); // Set loading to false even if there's an error
      });
  }
}, [sharedValue, setFetchedData]); // Run whenever `sharedValue` changes
}
export default Fetch;
