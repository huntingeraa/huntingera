import React from 'react';
import '../../styles/Table.css';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Table = ({ data }) => {

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Related Queries</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>        <a href={`${item}`}>
{item} </a></td>
           
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
