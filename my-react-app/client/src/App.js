import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Data from PostgreSQL</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.column_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;