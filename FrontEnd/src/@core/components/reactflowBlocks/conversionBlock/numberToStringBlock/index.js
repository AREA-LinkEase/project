import React from 'react';
import { Handle, Position } from 'reactflow';
import { Grid, Typography } from '@mui/material';

const NumberToStringBlock = ({ isConnectable, data }) => {
  const label = data.label || 'numberToString';
  const inputValue = data.inputValue || '0';
  const value = data.value || false;
  const type = data.type || 'number';
  const typeOutput = data.typeOutput || 'number';

  return (
    <Grid
      container
      sx={{
        width: '431px',
        height: '73px',
        flexShrink: 0,
        borderRadius: '10px',
        background: '#00CFE8',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
        position: 'relative',
      }}
      data={data}
    >
      <Typography
        variant="h5"
        sx={{
            // marginLeft: '-1px',
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Public Sans',
          fontSize: '30px',
          fontStyle: 'normal',
          fontWeight: 900,
          lineHeight: '22px',
          display: 'flex',
          height: '19.408px',
          flexDirection: 'column',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'absolute',
          top: '50%',
          left: '46%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {`Number->String`}
      </Typography>
      <Handle
        type="target"
        position={Position.Top}
        id={`entry`}
        style={{
            width: '13.129px',
            height: '13.129px',
            flexShrink: 0,
            background: '#007BFF',
            borderColor: 'rgba(0, 0, 0, 0.30)',
            borderWidth: '1px',
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`exit`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#28C76F',
          borderColor: 'rgba(0, 0, 0, 0.30)',
          borderWidth: '1px',
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        isConnectable={isConnectable}
      />
    </Grid>
  );
};

export default NumberToStringBlock;
