import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components and hooks.',
    addedToFavourites: false,
  },
  {
    id: 2,
    title: 'Advanced Redux',
    description: 'Master Redux Toolkit and async flows.',
    addedToFavourites: false,
  },
];

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const course = state.find(c => c.id === action.payload);
      if (course) {
        course.addedToFavourites = !course.addedToFavourites;
      }
    },
  },
});

export const { toggleFavourite, addCourse, removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;