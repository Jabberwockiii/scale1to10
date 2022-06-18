import rate1 from '../static/rate1.jpg';
import rate2 from '../static/rate2.jpg';
import React from 'react';
import Box from '@mui/material/Box';
function Gallery() {
  return  (
    <Box sx = {{pt: 10}}>
    <div width = '100%' sx = {{pt:10}}>
      <img src={rate1} alt="rate1" width = '60%'/>
      <img src={rate2} alt="rate2" width = '60%' />
    </div>
    </Box>
    );
}
export default (Gallery);