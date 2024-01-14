// edgesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const edgesSlice = createSlice({
  name: 'edges',
  initialState: [],
  reducers: {
    setReduxEdges: (state, action) => action.payload,
    addReduxEdge: (state, action) => {
      state.push(action.payload);
    },
    removeReduxEdge: (state, action) => {
      return state.filter(edge => edge.id !== action.payload);
    },
  },
});

export const { setReduxEdges, addReduxEdge, removeReduxEdge } = edgesSlice.actions;

export default edgesSlice.reducer;
