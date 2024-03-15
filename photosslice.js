import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    savedPhotos: JSON.parse(localStorage.getItem('savedPhotos')) || [],
  },
  reducers: {
    getPhotos: async (state) => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      state.photos = response.data;
    },
    savePhoto: (state, action) => {
      const photo = action.payload;
      if (!state.savedPhotos.includes(photo.id)) {
        state.savedPhotos.push(photo);
        localStorage.setItem('savedPhotos', JSON.stringify(state.savedPhotos));
      }
    },
    removePhoto: (state, action) => {
      const photoId = action.payload;
      state.savedPhotos = state.savedPhotos.filter((photo) => photo.id !== photoId);
      localStorage.setItem('savedPhotos', JSON.stringify(state.savedPhotos));
    },
  },
});

export const { getPhotos, savePhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;