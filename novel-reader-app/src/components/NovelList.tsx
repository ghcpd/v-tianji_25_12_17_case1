import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Novel } from '../types';

const NovelCard: React.FC<{ novel: Novel }> = ({ novel }) => {
  const { state, dispatch } = useApp();
  const isInBookshelf = state.bookshelf.includes(novel.id);

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <img src={novel.coverUrl} alt={novel.title} style={{ width: '100px', height: '150px' }} />
      <h3>{novel.title}</h3>
      <p>by {novel.author}</p>
      <p>{novel.description}</p>
      <Link to={`/novel/${novel.id}`}>View Details</Link>
      <button
        onClick={() => dispatch({ type: isInBookshelf ? 'REMOVE_FROM_BOOKSHELF' : 'ADD_TO_BOOKSHELF', payload: novel.id })}
        style={{ marginLeft: '1rem' }}
      >
        {isInBookshelf ? 'Remove from Bookshelf' : 'Add to Bookshelf'}
      </button>
    </div>
  );
};

const NovelList: React.FC = () => {
  const { state } = useApp();

  return (
    <div>
      <h1>Browse Novels</h1>
      {state.novels.map(novel => (
        <NovelCard key={novel.id} novel={novel} />
      ))}
    </div>
  );
};

export default NovelList;