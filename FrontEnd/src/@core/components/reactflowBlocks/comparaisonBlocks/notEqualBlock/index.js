import React from 'react';
import { Handle, Position } from 'reactflow';
import { Grid, Typography } from '@mui/material';

const NotEqualBlock = ({ isConnectable, data }) => {
  const label = data.label || 'notEqual';
  const value = data.value || '==';
  const type = data.type || '';

  const backgroundColor =
    type === 'bool'
      ? '#EA5455' // Red for bool
      : type === 'number'
      ? '#007BFF' // Blue for nbr
      : type === 'str'
      ? '#28C76F' // Green for str
      : type === 'array'
      ? '#AB5C00' // Brown for array
      : type === 'object'
      ? '#FFE500' // Yellow for object
      : '#FFF'; // Default color

  return (
    <Grid
      sx={{
        width: '431px',
        height: '73px',
        flexShrink: 0,
        borderRadius: '10px',
        background: '#FF9F43',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
        position: 'relative',
      }}
      data={data}
    >
      <Typography
        variant="h5"
        sx={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Public Sans',
          fontSize: '30px',
          fontStyle: 'normal',
          fontWeight: 900,
          lineHeight: '22px',
          display: 'flex',
          width: '85.622px',
          height: '19.408px',
          flexDirection: 'column',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        !=
      </Typography>
      <Handle
        type="target"
        position={Position.Top}
        id={`first`}
        style={{
            width: '13.129px',
            height: '13.129px',
            flexShrink: 0,
            background: backgroundColor,
            borderColor: 'rgba(0, 0, 0, 0.30)',
            borderWidth: '1px',
            position: 'absolute',
            bottom: '-6px',
            left: '25%',
            transform: 'translateX(-50%)',
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id={`second`}
        style={{
            width: '13.129px',
            height: '13.129px',
            flexShrink: 0,
            background: backgroundColor,
            borderColor: 'rgba(0, 0, 0, 0.30)',
            borderWidth: '1px',
            position: 'absolute',
            bottom: '-6px',
            left: '75%',
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
            background: '#EA5455',
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

export default NotEqualBlock;
