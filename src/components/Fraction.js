import React from 'react';
import './fraction.css'; // Import your CSS file

const Fraction = ({ x, y }) => {
  return (
    <div className="fraction">
      <div className="numerator">{x}</div>
      <div className="denominator">{y}</div>
    </div>
  );
};

export default Fraction;
