import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Handle, Position } from 'reactflow';
import { Grid, Typography, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RecurrenceBlock = ({ isConnectable, data }) => {
  const label = data.label || 'recurrence-date';
  const nodes = useSelector((state) => state.nodes.nodes);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('All');

  const handleSelectChange = (event) => {
    setSelectedDay(event.target.value);
    dispatchRecurrenceChanges(event.target.value, startDate);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    dispatchRecurrenceChanges(selectedDay, date);
  };

  const dispatchRecurrenceChanges = (day, date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const updatedNodes = nodes.map((node) =>
      node.id === label
        ? {
            ...node,
            data: {
              ...node.data,
              value: {
                day,
                hours,
                minutes,
              },
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
        background: '#EA5455',
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
          Recurrence
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 25px',
        }}
      >
        <Grid item className="custom-select-container">
          <select
            id="daySelect"
            value={selectedDay}
            onChange={handleSelectChange}
            className="custom-select"
          >
            <option value="All">All</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </Grid>
        <Grid style={{ paddingRight: '5px' }} />
        <Grid item>
          <DatePicker
            className="custom-datepicker"
            selected={startDate}
            onChange={handleDateChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </Grid>
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
          background: '#7367F0',
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

export default RecurrenceBlock;
