import React from 'react';
import './index.css';

const Spinner = () => {
  return (
    <div className="holder">
      <div className={'loader'}>
        <div className={'dot'}></div>
        <div className={'dot'}></div>
        <div className={'dot'}></div>
      </div>
    </div>
  );
};

export default Spinner;
