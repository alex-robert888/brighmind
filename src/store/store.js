import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses-slice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});