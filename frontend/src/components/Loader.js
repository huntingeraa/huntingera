import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default Loader
