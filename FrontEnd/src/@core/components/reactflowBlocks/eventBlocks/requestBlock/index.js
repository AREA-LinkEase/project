import React from 'react';
import { Handle, Position } from 'reactflow';
import { Grid, Typography } from '@mui/material';

const RequestBlock = ({ isConnectable, data }) => {

  return (
    <Grid
      sx={{
        width: '431px',
        height: '73px',
        flexShrink: 0,
        borderRadius: '10px',
        background: '#28C76F',
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
          left: '47%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        Request
      </Typography>
      <Handle

        type="target"
        position={Position.Top}
        id={`url`}
        style={{
            width: '13.129px',
            height: '13.129px',
            flexShrink: 0,
            background: '#28C76F',
            borderColor: 'rgba(0, 0, 0, 0.30)',
            borderWidth: '1px',
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
        }}
        isConnectable={isConnectable}>
            <div
          style={{
            color: '#fff',
            fontSize: '8px',
            position: 'absolute',
            top: '17px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Url
        </div>
    </Handle>
      <Handle
        type="target"
        position={Position.Right}
        id={`body`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#28C76F',
          borderColor: 'rgba(0, 0, 0, 0.30)',
          borderWidth: '1px',
          position: 'absolute',
          top: '1px',
          right: '25px',
        }}
        isConnectable={isConnectable}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '8px',
            position: 'absolute',
            top: '17px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Body
        </div>
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id={`exit`}
        style={{
            width: '13.129px',
            height: '13.129px',
            flexShrink: 0,
            background: '#fff',
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

export default RequestBlock;
