import React, { useState, useEffect } from 'react';

const Results = ({ content, interval, resultsType, status }) => {

  const getColor = (value) => {
    if (value > 0) return 'green';
    if (value < 0) return 'red';
    return 'black';
  };

  const numberStyle = (num) => ({
    color: getColor(num)
  });

  if (status === null) {
    return (
      <p>null</p>
    )
  } else if (status === "loading") {
    return (
      <p>Loading...</p>
    )
  }
   else if (status === "400") {
    return (
      <p>invalid input</p>
    )
  } else if (status === "500") {
    return (
      <p>internal error</p>
    )
  }
  else {
    try {
      var output = content;
      console.log(output);

      const columns = [
        { header: 'No.' },
        { header: 'Collection' },
        { header: (resultsType === 'load' ? 'Type' : 'Supply')},
        { header: 'Floor Price' },
        { header: 'Market Cap', accessor: 'market-cap' },
        { header: 'No. of Sales' },
        { header: 'Volume' },
        { header: 'Volume % Chg.' }
      ];
      
      var i = 0;
      if (interval === '1') {
        i = 0;
      } else if (interval === '7') {
        i = 1;
      } else if (interval === '30') {
        i = 2;
      }

      return (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {output.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  <td>
                    <div class="collection">
                      <img class="colle_icon" src={row[2]} alt={row[0]} />
                      <a href={row[4]} target="_blank" rel="noopener noreferrer">{row[0]}</a>
                    </div>
                  </td>
                  <td>{row[3] ? row[3] : "--"}</td>
                  <td>{row[5]["floor_price"] > 0 ? String(Math.round(row[5]["floor_price"] * 1000) / 1000) +
                    " ETH" : "--"}</td>
                  <td>{String(Math.round(row[5]["market_cap"])) + " ETH"}</td>
                  <td>{row[6][i]['sales']}</td>
                  <td>{String(Math.round(row[6][i]['volume'] * 100) / 100) + " ETH"}</td>
                  <td>
                    <p style={numberStyle(row[6][i]['volume_change'])}>
                      {String(Math.round(row[6][i]['volume_change'] * 1000) / 10) + "%"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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