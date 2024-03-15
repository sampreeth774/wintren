import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    savedPosts: JSON.parse(localStorage.getItem('savedPosts')) || [],
    savedPhotos: JSON.parse(localStorage.getItem('savedPhotos')) || [],
  },
  reducers: {
    remove: (state, action) => {
      const id = action.payload;
      const type = action.type.split('/')[1];
      if (type === 'post') {
        state.savedPosts = state.savedPosts.filter((postId) => postId !== id);
      } else {
        state.savedPhotos = state.savedPhotos.filter((photo) => photo.id !== id);
      }
      localStorage.setItem('savedPosts', JSON.stringify(state.savedPosts));
      localStorage.setItem('savedPhotos', JSON.stringify(state.savedPhotos));
    },
  },
});

export const { remove:removeSaved } = savedSlice.actions;

export default savedSlice.reducer;