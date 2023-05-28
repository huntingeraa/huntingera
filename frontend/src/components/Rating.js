import React from 'react'
import { RiStarFill, RiStarHalfFill } from 'react-icons/ri';

const Rating = ({ value }) => {
  return (
    <div>
      {value >= 1 ? (
        <RiStarFill color='#ffc107' />
      ) : value >= 0.5 ? (
        <RiStarHalfFill color='#ffc107' />
      ) : (
        <RiStarFill color='#e4e5e9' />
      )}
      {value >= 2 ? (
        <RiStarFill color='#ffc107' />
      ) : value >= 1.5 ? (
        <RiStarHalfFill color='#ffc107' />
      ) : (
        <RiStarFill color='#e4e5e9' />
      )}
      {value >= 3 ? (
        <RiStarFill color='#ffc107' />
      ) : value >= 2.5 ? (
        <RiStarHalfFill color='#ffc107' />
      ) : (
        <RiStarFill color='#e4e5e9' />
      )}
      {value >= 4 ? (
        <RiStarFill color='#ffc107' />
      ) : value >= 3.5 ? (
        <RiStarHalfFill color='#ffc107' />
      ) : (
        <RiStarFill color='#e4e5e9' />
      )}
      {value >= 5 ? (
        <RiStarFill color='#ffc107' />
      ) : value >= 4.5 ? (
        <RiStarHalfFill color='#ffc107' />
      ) : (
        <RiStarFill color='#e4e5e9' />
      )}
    </div>
  );
};


export default Rating
