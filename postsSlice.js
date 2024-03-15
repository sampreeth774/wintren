import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    savedPosts: JSON.parse(localStorage.getItem('savedPosts')) || [],
  },
  reducers: {
    getPosts: async (state) => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      state.posts = response.data;
    },
    savePost: (state, action) => {
      const postId = action.payload;
      if (!state.savedPosts.includes(postId)) {
        state.savedPosts.push(postId);
        localStorage.setItem('savedPosts', JSON.stringify(state.savedPosts));
      }
    },
    removePost: (state, action) => {
      const postId = action.payload;
      state.savedPosts = state.savedPosts.filter((id) => id !== postId);
      localStorage.setItem('savedPosts', JSON.stringify(state.savedPosts));
    },
  },
});

export const { getPosts, savePost, removePost } = postsSlice.actions;

export default postsSlice.reducer;