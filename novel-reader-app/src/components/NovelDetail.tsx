import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NovelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const novel = state.novels.find(n => n.id === id);

  if (!novel) return <div>Novel not found</div>;

  return (
    <div>
      <h1>{novel.title}</h1>
      <p>by {novel.author}</p>
      <p>{novel.description}</p>
      <h2>Chapters</h2>
      <ul>
        {novel.chapters.map(chapter => (
          <li key={chapter.id}>
            <Link to={`/read/${novel.id}/${chapter.id}`}>{chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NovelDetail;