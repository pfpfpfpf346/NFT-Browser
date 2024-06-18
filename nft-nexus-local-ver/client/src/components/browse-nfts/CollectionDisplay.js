import React, { useState, useEffect } from 'react';

const Results = ({ content }) => {
  const [images, setImages] = useState([]);

  if (content.length === 0) {
    return (
      <p>null</p>
    )
  } else if (content === "400") {
    return (
      <p>invalid input</p>
    )
  } else if (content === "error") {
    return (
      <p>error</p>
    )
  }
  else {
    try {
      var output = content;
      console.log(output);

      const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Age', accessor: 'age' },
        { header: 'Email', accessor: 'email' },
      ];

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
                  <td>{row["collection"]}</td>
                  <td>{row["cursor"]}</td>
                  <td>{row["sort"]}</td>
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