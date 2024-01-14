import React from 'react';
import { Handle, Position } from 'reactflow';
import { Grid, Typography } from '@mui/material';

const IfBlock = ({ isConnectable, data }) => {
  const label = data.label || 'if';
  const value = data.value || 'if';
  const type = data.type || 'bool';

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
        If
      </Typography>
      {/* Handle en blanc en haut au milieu */}
      <Handle
        type="target"
        position={Position.Top}
        id={`entry`} // entry
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
      {/* Handle blanc en bas au milieu avec annotation 'Success' */}
      <Handle
        type="source"
        position={Position.Bottom}
        id={`success`}
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
      >
        <div
          style={{
            color: '#fff',
            fontSize: '8px',
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Success
        </div>
      </Handle>
      {/* Handle blanc en bas à gauche avec annotation 'Exit' */}
      <Handle
        type="source"
        position={Position.Left}
        id={`exit`}
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
          Exit
        </div>
      </Handle>
      {/* Handle blanc en bas à droite avec annotation 'Else' */}
      <Handle
        type="source"
        position={Position.Right}
        id={`failure`}
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
          Else
        </div>
      </Handle>
      {/* Handle en haut à droite en rouge avec annotation 'Argument' */}
      <Handle
        type="target"
        position={Position.Right}
        id={`condition`}
        style={{
          width: '13.129px',
          height: '13.129px',
          flexShrink: 0,
          background: '#EA5455',
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
          Condition
        </div>
      </Handle>
    </Grid>
  );
};

export default IfBlock;
