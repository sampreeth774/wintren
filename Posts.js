import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, savePost } from '../features/posts/postsSlice';
import axios from 'axios';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const savedPosts = useSelector((state) => state.posts.savedPosts);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSavePost = async (post) => {
    await dispatch(savePost(post));
  };

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {savedPosts.includes(post.id) ? (
              <button onClick={() => handleSavePost(post.id)}>Unsave</button>
            ) : (
              <button onClick={() => handleSavePost(post.id)}>Save</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => paginate(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Posts;