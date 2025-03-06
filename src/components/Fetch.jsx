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
        })
        .catch((error) => {
          setError(error.message); // Set error message if something goes wrong
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [sharedValue]); // Run whenever `sharedValue` changes
  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {news.map((article) => (
          <li key={article.article_id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fetch;
