import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { NovelBrowser } from './components/NovelBrowser';
import { Reader } from './components/Reader';
import { Settings } from './components/Settings';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState<'browser' | 'reader'>('browser');
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleNovelSelect = (novelId: string) => {
    setSelectedNovelId(novelId);
    setCurrentView('reader');
  };

  const handleCloseReader = () => {
    setCurrentView('browser');
    setSelectedNovelId(null);
  };

  return (
    <div className="app">
      {currentView === 'browser' && (
        <>
          <header className="app-header">
            <div className="header-content">
              <h1>📚 Novel Reader</h1>
              <button onClick={() => setShowSettings(true)} className="settings-button">
                ⚙️ Settings
              </button>
            </div>
          </header>
          <NovelBrowser onNovelSelect={handleNovelSelect} />
        </>
      )}
      
      {currentView === 'reader' && selectedNovelId && (
        <Reader novelId={selectedNovelId} onClose={handleCloseReader} />
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

