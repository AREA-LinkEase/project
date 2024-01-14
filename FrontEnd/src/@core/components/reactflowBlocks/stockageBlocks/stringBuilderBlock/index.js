import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { Grid, Typography, TextField } from '@mui/material';

const StringBuilderBlock = ({ isConnectable, data }) => {
  const label = data.label || 'string';
  const value = data.value || '';
  const [filteredValue, setFilteredValue] = useState(value);
  const [handleCount, setHandleCount] = useState(0);
  const nodes = useSelector((state) => state.nodes.nodes);
  const dispatch = useDispatch();
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const percentCount = (value.match(/%/g) || []).length;
    const newHandleCount = Math.max(0, Math.floor(percentCount / 2));
    setHandleCount(newHandleCount);
    updateNodeInternals(label);
  }, [value, label, updateNodeInternals]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setFilteredValue(inputValue);

    const updatedNodes = nodes.map((node) =>
      node.id === label
        ? {
            ...node,
            data: {
              ...node.data,
              value: inputValue,
            },
          }
        : node
    );

    dispatch({
      type: 'SET_NODES',
      payload: updatedNodes,
    });
  };

  const handlePosition = useCallback(
    (index) => `${(index * 10) + 5}%`,
    []
  );

  return (
    <Grid
      container
      sx={{
        width: '431px',
        height: '73px',
        flexShrink: 0,
        borderRadius: '10px',
        background: '#E83E8C',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.30)',
        position: 'relative',
      }}
      data={data}
    >
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#FFF',
            textAlign: 'left',
            fontFamily: 'Public Sans',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 900,
            lineHeight: '22px',
            position: 'relative',
            top: handleCount > 0 ? '6px' : '0',
          }}
        >
          StringBuilder
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <TextField
          variant="outlined"
          size="small"
          defaultValue={value}
          fullWidth
          placeholder="Value"
          value={filteredValue}
          onChange={handleInputChange}
          InputProps={{
            style: {
              display: 'flex',
              padding: '7px 14px',
              alignItems: 'center',
              gap: '12px',
              flex: '1 0 0',
              borderRadius: '6px',
              color: '#B7B5BE',
              fontFeatureSettings: 'clig off, liga off',
              fontFamily: 'Public Sans',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '24px',
              backgroundColor: 'rgba(0, 0, 0, 0.26)',
              position: 'relative',
              top: handleCount > 0 ? '5px' : '0',
            },
          }}
        />
      </Grid>
      {handleCount > 0 && (
        <Grid item xs={12}>
          {[...Array(handleCount)].map((_, index) => (
            <Handle
              key={index}
              type="target"
              position={Position.Top}
              id={`entry-${index}`}
              style={{
                width: '13.129px',
                height: '13.129px',
                flexShrink: 0,
                background: '#28C76F',
                borderColor: 'rgba(0, 0, 0, 0.30)',
                borderWidth: '1px',
                position: 'absolute',
                top: '-6px',
                left: handlePosition(index),
              }}
              isConnectable={isConnectable}
            />
          ))}
        </Grid>
      )}
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

export default StringBuilderBlock;
