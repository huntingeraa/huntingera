import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import Rating from './Rating';

const Vendorcreation = ({ vendorcreation }) => {
  return (
    <Card className='my p-2 fixed rounded h-100'>
      <Link to={`/store/vendor/${vendorcreation._id}`}>
        <Card.Img src={vendorcreation.image} variant='top' className='h-6vw' />
      </Link>
      <Card.Body>
        <Link to={`/store/vendor/${vendorcreation._id}`}>
          <Card.Title as='div'>
            <strong>{vendorcreation.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={vendorcreation.rating}
            text={`${vendorcreation.numReviews} reviews`}
            color='red'
          />
        </Card.Text>
        <Card.Text as='h6'>{vendorcreation.location}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Vendorcreation;
