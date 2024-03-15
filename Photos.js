import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos, savePhoto } from '../features/photos/photosSlice';
import axios from 'axios';

const Photos = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const savedPhotos = useSelector((state) => state.photos.savedPhotos);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const indexOfLastPhoto = currentPage * postsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - postsPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSavePhoto = async (photo) => {
    await dispatch(savePhoto(photo));
  };

  return (
    <div>
      <h2>Photos</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {currentPhotos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <h3>{photo.title}</h3>
            {savedPhotos.includes(photo.id) ? (
              <button onClick={() => handleSavePhoto(photo.id)}>Unsave</button>
            ) : (
              <button onClick={() => handleSavePhoto(photo.id)}>Save</button>
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

export default Photos;