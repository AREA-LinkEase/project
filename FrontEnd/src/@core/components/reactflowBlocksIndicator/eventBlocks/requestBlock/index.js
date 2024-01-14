import React from 'react';
import { Grid, Typography } from '@mui/material';

const RequestBlockIndicator = () => {
  return (
    <Grid
      sx={{
        width: '70px',
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
        Request
      </Typography>
    </Grid>
  );
};

export default RequestBlockIndicator;
