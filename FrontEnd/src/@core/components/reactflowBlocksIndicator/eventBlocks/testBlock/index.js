import React, { useRef, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

const TestBlockIndicator = ({ name }) => {
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (indicatorRef.current && name) {
      const textWidth = getTextWidth(name, '14px', 'Public Sans');
      indicatorRef.current.style.width = `${textWidth + 20}px`;
    }
  }, [name]);

  const getTextWidth = (text, fontSize, fontFamily) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${fontSize} ${fontFamily}`;
    const width = context.measureText(text).width;
    return width;
  };

  return (
    <Grid
      ref={indicatorRef}
      sx={{
        height: '30px',
        flexShrink: 0,
        borderRadius: '5px',
        background: '#28C76F',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
        position: 'relative',
        cursor: 'grab',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Public Sans',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {name ? name : 'Test'}
      </Typography>
    </Grid>
  );
};

export default TestBlockIndicator;
