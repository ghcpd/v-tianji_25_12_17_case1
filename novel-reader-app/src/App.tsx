import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NovelList from './components/NovelList';
import NovelDetail from './components/NovelDetail';
import Reader from './components/Reader';
import Bookshelf from './components/Bookshelf';
import Bookmarks from './components/Bookmarks';
import { useApp } from './context/AppContext';
import './App.css';

const AppContent: React.FC = () => {
  const { state } = useApp();

  return (
    <div className={`app ${state.theme}`}>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<NovelList />} />
          <Route path="/novel/:id" element={<NovelDetail />} />
          <Route path="/read/:novelId/:chapterId" element={<Reader />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
