import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TestBlock = ({ isConnectable, data, name }) => {
    const id = data.label || '';
    const nodes = useSelector((state) => state.nodes.nodes);
    const node = nodes.find((node) => node.id === id);
    const nbrEntry = node ? node.data.nbrEntry || 0 : 0;

    const handlePosition = useCallback(
        (index) => `${(index * 10) + 5}%`,
        []
    );

    const calculateLeftPosition = () => {
        if (name) {
            const nameLength = name.length;
            const leftPercentage = 47 - nameLength * 1;
            return leftPercentage + '%';
        }
        return '47%';
    };

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
                    left: calculateLeftPosition(),
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {name ? name : 'Test'}
            </Typography>
            {nbrEntry > 0 && (
                <Grid item xs={12}>
                    {[...Array(nbrEntry)].map((_, index) => (
                        <Handle
                            key={index}
                            type="target"
                            position={Position.Top}
                            id={`entry-${index}`}
                            style={{
                                width: '13.129px',
                                height: '13.129px',
                                flexShrink: 0,
                                background: '#FFF',
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

export default TestBlock;
