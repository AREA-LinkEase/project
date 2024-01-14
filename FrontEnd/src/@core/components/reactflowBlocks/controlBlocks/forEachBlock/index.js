import React from 'react';
import { Handle, Position } from 'reactflow';
import { Grid, Typography } from '@mui/material';

const ForEachBlock = ({ isConnectable, data }) => {
  const label = data.label || 'forEach';
  const value = data.value || 'forEach';
  const type = data.type || 'array';

  return (
    <Grid
      sx={{
        width: '431px',
        height: '73px',
        flexShrink: 0,
        borderRadius: '10px',
        background: '#000',
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
        ForEach
      </Typography>
      {/* Handle en blanc en haut au milieu */}
      <Handle
        type="target"
        position={Position.Top}
        id={`entry`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#fff',
          borderColor: 'rgba(0, 0, 0, 0.30)',
          borderWidth: '1px',
          position: 'absolute',
          top: '-5px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        isConnectable={isConnectable}
      />
      {/* Handle blanc en bas à gauche avec annotation 'Exit' */}
      <Handle
        type="source"
        position={Position.Left}
        id={`action`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#fff',
          borderColor: 'rgba(0, 0, 0, 0.30)',
          borderWidth: '1px',
          position: 'absolute',
          top: '58px',
          left: '25px',
          transform: 'translateY(50%)',
        }}
        isConnectable={isConnectable}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '8px',
            position: 'absolute',
            top: '-5px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Action
        </div>
      </Handle>
      {/* Handle blanc en bas à droite avec annotation 'Else' */}
      <Handle
        type="source"
        position={Position.Right}
        id={`exit`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#FFF',
          borderColor: 'rgba(0, 0, 0, 0.30)',
          borderWidth: '1px',
          position: 'absolute',
          top: '71px',
          right: '25px',
        }}
        isConnectable={isConnectable}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '8px',
            position: 'absolute',
            top: '-5px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Exit
        </div>
      </Handle>
      {/* Handle en haut à droite en rouge avec annotation 'Argument' */}
      <Handle
        type="target"
        position={Position.Right}
        id={`argument`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#AB5C00',
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
          Argument
        </div>
      </Handle>
    </Grid>
  );
};

export default ForEachBlock;
