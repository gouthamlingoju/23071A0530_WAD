import { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [postData, setPostData] = useState('');
  const [postResponse, setPostResponse] = useState('');

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000${endpoint}`);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse('Error fetching data');
    }
  };

  const sendData = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: postData,
      });
      const data = await res.text();
      setPostResponse(data);
    } catch (error) {
      setPostResponse('Error sending data');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Custom HTTP Server Frontend</h1>
      </header>
      <main className="main">
        <div className="buttons">
          <button onClick={() => fetchData('/')}>Fetch Home</button>
          <button onClick={() => fetchData('/about')}>Fetch About</button>
        </div>
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
        <div className="post-section">
          <h2>Send Data</h2>
          <textarea
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
            placeholder="Enter data to send..."
          ></textarea>
          <button onClick={sendData}>Send</button>
          <div className="post-response">
            <h3>Post Response:</h3>
            <p>{postResponse}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
