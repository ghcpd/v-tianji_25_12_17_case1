import React from 'react'
import styles from './Settings.module.css'
import { useNovelStore } from '../store'

export const Settings: React.FC = () => {
  const currentTheme = useNovelStore(state => state.currentTheme)
  const fontSize = useNovelStore(state => state.fontSize)
  const toggleTheme = useNovelStore(state => state.toggleTheme)
  const setFontSize = useNovelStore(state => state.setFontSize)
  const increaseFontSize = useNovelStore(state => state.increaseFontSize)
  const decreaseFontSize = useNovelStore(state => state.decreaseFontSize)
  
  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      
      <div className={styles.section}>
        <h3>Theme</h3>
        <div className={styles.themeControl}>
          <p>Current theme: <strong>{currentTheme === 'light' ? '☀️ Light' : '🌙 Dark'}</strong></p>
          <button 
            className={styles.btn}
            onClick={toggleTheme}
          >
            Switch to {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
      
      <div className={styles.section}>
        <h3>Font Size</h3>
        <div className={styles.fontControl}>
          <button 
            className={styles.btnSmall}
            onClick={decreaseFontSize}
          >
            A−
          </button>
          <div className={styles.fontDisplay}>
            <div className={styles.fontPreview} style={{ fontSize: `${fontSize}px` }}>
              Sample Text
            </div>
            <p className={styles.fontLabel}>{fontSize}px</p>
          </div>
          <button 
            className={styles.btnSmall}
            onClick={increaseFontSize}
          >
            A+
          </button>
        </div>
        <input 
          type="range"
          min="12"
          max="28"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className={styles.slider}
        />
      </div>
      
      <div className={styles.section}>
        <h3>About</h3>
        <div className={styles.about}>
          <p><strong>Novel Reading Web App</strong></p>
          <p>Version 1.0.0</p>
          <p>A modern, responsive web application for reading novels with tracking, bookmarks, and personalization.</p>
          <div className={styles.features}>
            <p><strong>Features:</strong></p>
            <ul>
              <li>Browse and read novels</li>
              <li>Track reading progress</li>
              <li>Bookmark favorite chapters</li>
              <li>Manage personal bookshelf</li>
              <li>Light/Dark theme support</li>
              <li>Adjustable font size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
