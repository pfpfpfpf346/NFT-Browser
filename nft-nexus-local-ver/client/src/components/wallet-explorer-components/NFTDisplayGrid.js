import React, { useState, useEffect } from 'react';

const testImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const getWorkingIpfsUrl = async (cid) => {
  const gateways = [
    `https://ipfs.io/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
    `https://gateway.pinata.cloud/ipfs/${cid}`
  ];

  for (const gateway of gateways) {
    const isWorking = await testImageUrl(gateway);
    if (isWorking) {
      return gateway;
    }
  }

  return null;
};

const Results = ({ content }) => {
  const [images, setImages] = useState([]);

  if (content === null) {
    return (
      <p>null</p>
    )
  } else if (content === "400") {
    return (
      <p>invalid input</p>
    )
  }
  else {
    try {
      var output = content;
      console.log(output)
      return (
        <div className="grid-container">
          {output.map((item, index) => (
            <div className="grid-item" key={index}>
              <div id="image-container">
                <img src={item[2]} alt={item[0]} />
              </div>
              <h3>{item[0] ? item[0] : "<no-name>"}</h3>
              <p>{item[1]}</p>
              <a href={item[3]} target="_blank" rel="noopener noreferrer">View On Opensea</a>
            </div>
          ))}
        </div>
      );
    } catch {
      return (
        <p>Unknown error</p>
      )
    }
  }
};


export default Results;