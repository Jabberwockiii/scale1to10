import rate1 from '../static/rate1.jpg';
import rate2 from '../static/rate2.jpg';
import React from 'react';

function Gallery() {
  return (
    <div width = '100%'>
      <img src={rate1} alt="rate1" width = '60%'/>
      <img src={rate2} alt="rate2" width = '60%' />
    </div>
    );
}
export default (Gallery);