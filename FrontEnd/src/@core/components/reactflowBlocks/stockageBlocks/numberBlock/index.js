import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Handle, Position } from 'reactflow';
import { Grid, Typography, TextField } from '@mui/material';
import { compareValues, convertType, getConnectedNodes, isComparaisonNode, isConversionNode } from 'src/@core/layouts/utils';

const NumberBlock = ({ isConnectable, data }) => {
  const label = data.label || 'number';
  const value = data.value || '0';
  const [filteredValue, setFilteredValue] = useState(value);
  const nodes = useSelector((state) => state.nodes.nodes);
  const edges = useSelector((state) => state.edges);
  const dispatch = useDispatch();

  const changeConversionValue = (connectedNode, newValue, newNodes) => {
    const value = parseInt(newValue);
    console.log(value);
    const valueBool = convertType(connectedNode.type, value);
    console.log(connectedNode.id);
    const updatedNodes = newNodes.map((node) =>
      node.id === connectedNode.id
        ? {
            ...node,
            data: {
              ...node.data,
              inputValue: value,
              value: valueBool,
            },
          }
        : node
    );

    dispatch({
      type: 'SET_NODES',
      payload: updatedNodes,
    });
    const node = getConnectedNodes(connectedNode.id, updatedNodes, edges);
    const realNode = node.find(node => node.id !== label);
    const test = getConnectedNodes(realNode.id, updatedNodes, edges);
    const test2 = test.find(node => node.id !== connectedNode.id);
    const realValue = test2.data.value;
    if (realValue !== undefined) {
      const result = compareValues(realNode.type, "bool", valueBool, realValue);
      dispatch({
        type: 'SET_NODES',
        payload: updatedNodes.map(node =>
          node.id === realNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  value: result,
                },
              }
            : node
        ),
      });
    } else {
        console.log('Other connected block not found');
    }
  };

  const changeComparaisonValue = (connectedNode, newValue, newNodes) => {
    const connectedNodes = getConnectedNodes(connectedNode.id, newNodes, edges);

    if (connectedNodes.length === 2) {
        const otherNode = connectedNodes.find(node => node.id !== label);
        const value = otherNode.data.value;

        if (otherNode) {
          const result = compareValues(connectedNode.type, connectedNodes[0].data.type, newValue, value);
          dispatch({
            type: 'SET_NODES',
            payload: newNodes.map(node =>
              node.id === connectedNode.id
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      value: result,
                    },
                  }
                : node
            ),
          });
        } else {
            console.log('Other connected block not found');
        }
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setFilteredValue(numericValue);
    
    const connectedNodes = getConnectedNodes(data.label, nodes, edges);
    const updatedNodes = nodes.map((node) =>
      node.id === label
        ? {
            ...node,
            data: {
              ...node.data,
              value: parseInt(numericValue),
            },
          }
        : node
    );

    dispatch({
      type: 'SET_NODES',
      payload: updatedNodes,
    });
  };

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
      <Grid
        item
        xs={5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 30px',
        }}
      >
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
          }}
        >
          Number
        </Typography>
      </Grid>
      <Grid
        item
        xs={7}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          defaultValue={value}
          fullWidth
          placeholder='0'
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
            },
          }}
        />
      </Grid>
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
          background: '#007BFF',
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

export default NumberBlock;
