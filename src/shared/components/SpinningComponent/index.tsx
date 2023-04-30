import React from 'react';
import './index.css';

const SpinningComponent = () => {
  return (
    <div className="holder">
      <div className={'spinnerContainer'}>
        <div className={'spinner'}>
          <div className={'spinnerDot'} />
          <div className={'spinnerDot'} />
          <div className={'spinnerDot'} />
          <div className={'spinnerDot'} />
        </div>
      </div>
    </div>
  );
};

export default SpinningComponent;
