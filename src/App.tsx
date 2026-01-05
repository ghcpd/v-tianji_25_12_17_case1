import React, { useState, useEffect } from 'react'
import { NovelBrowser } from './components/NovelBrowser'
import { Reader } from './components/Reader'
import { Bookshelf } from './components/Bookshelf'
import { Settings } from './components/Settings'
import { useNovelStore } from './store'
import styles from './App.module.css'

type View = 'browser' | 'reader' | 'bookshelf' | 'settings'

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('browser')
  const [selectedNovelId, setSelectedNovelId] = useState<string | undefined>()
  
  const currentTheme = useNovelStore(state => state.currentTheme)
  const addToBookshelf = useNovelStore(state => state.addToBookshelf)
  const removeFromBookshelf = useNovelStore(state => state.removeFromBookshelf)
  const isInBookshelf = useNovelStore(state => state.isInBookshelf)
  const getNovelById = useNovelStore(state => state.getNovelById)
  
  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    if (currentTheme === 'dark') {
      root.style.setProperty('--bg', '#1a1a1a')
      root.style.setProperty('--card-bg', '#2d2d2d')
      root.style.setProperty('--card-bg-selected', '#3d3d3d')
      root.style.setProperty('--text', '#e0e0e0')
      root.style.setProperty('--text-secondary', '#999999')
      root.style.setProperty('--border', '#444444')
      root.style.setProperty('--primary', '#6366f1')
      root.style.setProperty('--primary-hover', '#818cf8')
      root.style.setProperty('--secondary', '#3d3d3d')
      root.style.setProperty('--secondary-hover', '#505050')
      root.style.setProperty('--disabled', '#555555')
      root.style.setProperty('--error', '#ef4444')
      root.style.setProperty('--tag-bg', '#404040')
      root.style.setProperty('--tag-text', '#e0e0e0')
      root.style.setProperty('--progress-bg', '#404040')
    } else {
      root.style.setProperty('--bg', '#ffffff')
      root.style.setProperty('--card-bg', '#f5f5f5')
      root.style.setProperty('--card-bg-selected', '#e8e8ff')
      root.style.setProperty('--text', '#1a1a1a')
      root.style.setProperty('--text-secondary', '#666666')
      root.style.setProperty('--border', '#e0e0e0')
      root.style.setProperty('--primary', '#6366f1')
      root.style.setProperty('--primary-hover', '#4f46e5')
      root.style.setProperty('--secondary', '#e8e8e8')
      root.style.setProperty('--secondary-hover', '#d0d0d0')
      root.style.setProperty('--disabled', '#cccccc')
      root.style.setProperty('--error', '#dc2626')
      root.style.setProperty('--tag-bg', '#e0e0ff')
      root.style.setProperty('--tag-text', '#4f46e5')
      root.style.setProperty('--progress-bg', '#e0e0e0')
    }
    document.body.style.backgroundColor = getComputedStyle(root).getPropertyValue('--bg')
    document.body.style.color = getComputedStyle(root).getPropertyValue('--text')
  }, [currentTheme])
  
  const handleSelectNovel = (novelId: string) => {
    setSelectedNovelId(novelId)
    setCurrentView('reader')
  }
  
  const handleAddToBookshelf = () => {
    if (selectedNovelId) {
      if (!isInBookshelf(selectedNovelId)) {
        addToBookshelf(selectedNovelId, 'reading')
      }
    }
  }
  
  const handleRemoveFromBookshelf = () => {
    if (selectedNovelId) {
      removeFromBookshelf(selectedNovelId)
    }
  }
  
  const handleCloseReader = () => {
    setCurrentView('browser')
  }
  
  const selectedNovel = selectedNovelId ? getNovelById(selectedNovelId) : undefined
  const inBookshelf = selectedNovelId ? isInBookshelf(selectedNovelId) : false
  
  return (
    <div className={`${styles.app} theme-${currentTheme}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Novel Reader</h1>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navBtn} ${currentView === 'browser' ? styles.active : ''}`}
            onClick={() => setCurrentView('browser')}
          >
            Browse
          </button>
          <button 
            className={`${styles.navBtn} ${currentView === 'bookshelf' ? styles.active : ''}`}
            onClick={() => setCurrentView('bookshelf')}
          >
            Bookshelf
          </button>
          <button 
            className={`${styles.navBtn} ${currentView === 'settings' ? styles.active : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            Settings
          </button>
        </nav>
        
        {currentView === 'reader' && selectedNovel && (
          <div className={styles.readerActions}>
            <button 
              className={`${styles.bookshelfBtn} ${inBookshelf ? styles.inBookshelf : ''}`}
              onClick={inBookshelf ? handleRemoveFromBookshelf : handleAddToBookshelf}
            >
              {inBookshelf ? '✓ In Bookshelf' : '+ Add to Bookshelf'}
            </button>
          </div>
        )}
      </header>
      
      <main className={styles.main}>
        {currentView === 'browser' && (
          <NovelBrowser onSelectNovel={handleSelectNovel} selectedNovelId={selectedNovelId} />
        )}
        
        {currentView === 'reader' && selectedNovelId && (
          <Reader novelId={selectedNovelId} onClose={handleCloseReader} />
        )}
        
        {currentView === 'bookshelf' && (
          <Bookshelf onSelectNovel={handleSelectNovel} />
        )}
        
        {currentView === 'settings' && (
          <Settings />
        )}
      </main>
      
      <footer className={styles.footer}>
        <p>Novel Reading Web App © 2024 - Made with React & Zustand</p>
      </footer>
    </div>
  )
}

export default App
