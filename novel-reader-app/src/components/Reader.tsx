import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Bookmark } from '../types';

const Reader: React.FC = () => {
  const { novelId, chapterId } = useParams<{ novelId: string; chapterId: string }>();
  const { state, dispatch } = useApp();
  const novel = state.novels.find(n => n.id === novelId);
  const chapter = novel?.chapters.find(c => c.id === chapterId);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = state.progress.find(p => p.novelId === novelId && p.chapterId === chapterId);
    if (progress && contentRef.current) {
      contentRef.current.scrollTop = progress.position;
    }
  }, [novelId, chapterId, state.progress]);

  const handleScroll = () => {
    if (contentRef.current) {
      const position = contentRef.current.scrollTop;
      setScrollPosition(position);
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: { novelId: novelId!, chapterId: chapterId!, position },
      });
    }
  };

  const addBookmark = () => {
    const bookmark: Bookmark = {
      id: Date.now().toString(),
      novelId: novelId!,
      chapterId: chapterId!,
      position: scrollPosition,
      note: 'Bookmark added',
    };
    dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
  };

  const adjustFontSize = (delta: number) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: Math.max(12, Math.min(24, state.fontSize + delta)) });
  };

  if (!novel || !chapter) return <div>Not found</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
        <h2>{novel.title} - {chapter.title}</h2>
        <div>
          <button onClick={toggleTheme}>{state.theme === 'light' ? 'Dark' : 'Light'}</button>
          <button onClick={() => adjustFontSize(-2)}>-</button>
          <span>Font: {state.fontSize}px</span>
          <button onClick={() => adjustFontSize(2)}>+</button>
          <button onClick={addBookmark}>Bookmark</button>
        </div>
      </div>
      <div
        ref={contentRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          fontSize: `${state.fontSize}px`,
          backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
          color: state.theme === 'dark' ? '#fff' : '#000',
        }}
      >
        {chapter.content.split('\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
      <div style={{ padding: '1rem', borderTop: '1px solid #ccc' }}>
        Progress: {Math.round((scrollPosition / (contentRef.current?.scrollHeight || 1)) * 100)}%
      </div>
    </div>
  );
};

export default Reader;