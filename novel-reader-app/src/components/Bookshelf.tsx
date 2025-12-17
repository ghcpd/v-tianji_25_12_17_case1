import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Bookshelf: React.FC = () => {
  const { state, dispatch } = useApp();
  const bookshelfNovels = state.novels.filter(novel => state.bookshelf.includes(novel.id));

  return (
    <div>
      <h1>My Bookshelf</h1>
      {bookshelfNovels.length === 0 ? (
        <p>No novels in your bookshelf yet.</p>
      ) : (
        bookshelfNovels.map(novel => (
          <div key={novel.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
            <img src={novel.coverUrl} alt={novel.title} style={{ width: '100px', height: '150px' }} />
            <h3>{novel.title}</h3>
            <p>by {novel.author}</p>
            <Link to={`/novel/${novel.id}`}>View Details</Link>
            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_BOOKSHELF', payload: novel.id })}
              style={{ marginLeft: '1rem' }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookshelf;