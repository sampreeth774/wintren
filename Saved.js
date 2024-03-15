import React, { useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { removePhoto, removePost } from '../features/saved/savedSlice';

const Saved = () => {
  const dispatch = useDispatch();
  const savedPosts = useSelector((state) => state.saved.savedPosts);
  const savedPhotos = useSelector((state) => state.saved.savedPhotos);

  const handleRemove = (id, type) => {
    if (type === 'post') {
      dispatch(removePost(id));
    } else {
      dispatch(removePhoto(id));
    }
  };

  return (
    <div>
      <h2>Saved</h2>
      <ul>
        {savedPosts.map((id) => (
          <li key={id}>
            <button onClick={() => handleRemove(id, 'post')}>Unsave</button>
          </li>
        ))}
        {savedPhotos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <h3>{photo.title}</h3>
            <button onClick={() => handleRemove(photo.id, 'photo')}>Unsave</button>
          </li>
       ))}
      </ul>
    </div>
  );
};

export default Saved;