//@ts-ignore
import React from 'react';

const SpinComponete = () => {
  return (
    <div className="overlay-wrapper" id="spin1">
      <div className="overlay">
         <i className="fas fa-3x fa-sync-alt fa-spin"></i>
         <div className="text-bold pt-2">Loading...</div>
      </div>
   </div>
  );
};

export default SpinComponete;