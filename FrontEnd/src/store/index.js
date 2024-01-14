// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import nodesReducer from 'src/store/apps/nodes'
import edgesReducer from 'src/store/apps/edges';

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
