import React from 'react';

const Results = ({ content }) => {

  if (content === null) {
    return (
      <p>null</p>
    )
  } else {
    try {
      var output = content["output"];
      return (
        <div className="grid-container">
          {output.map((item, index) => (
            <div className="grid-item" key={index}>
              <img src={item[2]} alt={item[0]} />
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
              <a href={item[3]} target="_blank" rel="noopener noreferrer">View Metadata</a>
            </div>
          ))}
        </div>
      );
    } catch {
      return (
        <p>error</p>
      )
    }
  }
};


export default Results;