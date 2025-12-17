import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Bookmarks: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <div>
      <h1>My Bookmarks</h1>
      {state.bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        state.bookmarks.map(bookmark => {
          const novel = state.novels.find(n => n.id === bookmark.novelId);
          const chapter = novel?.chapters.find(c => c.id === bookmark.chapterId);
          return (
            <div key={bookmark.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
              <h3>{novel?.title} - {chapter?.title}</h3>
              <p>Position: {bookmark.position}</p>
              {bookmark.note && <p>Note: {bookmark.note}</p>}
              <Link to={`/read/${bookmark.novelId}/${bookmark.chapterId}`}>Go to Bookmark</Link>
              <button
                onClick={() => dispatch({ type: 'REMOVE_BOOKMARK', payload: bookmark.id })}
                style={{ marginLeft: '1rem' }}
              >
                Remove
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Bookmarks;