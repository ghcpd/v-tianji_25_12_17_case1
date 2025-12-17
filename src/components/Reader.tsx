import React, { useState } from 'react'
import styles from './Reader.module.css'
import { useNovelStore } from '../store'

interface ReaderProps {
  novelId: string
  onClose: () => void
}

export const Reader: React.FC<ReaderProps> = ({ novelId, onClose }) => {
  const [currentChapter, setCurrentChapter] = useState(1)
  
  const novel = useNovelStore(state => state.getNovelById(novelId))
  const chapter = useNovelStore(state => state.getChapter(novelId, currentChapter))
  const fontSize = useNovelStore(state => state.fontSize)
  const updateProgress = useNovelStore(state => state.updateReadingProgress)
  const addBookmark = useNovelStore(state => state.addBookmark)
  const getBookmarks = useNovelStore(state => state.getBookmarks(novelId))
  const isBookmarked = useNovelStore(state => state.isBookmarked)
  const removeBookmark = useNovelStore(state => state.removeBookmark)
  const progress = useNovelStore(state => state.getProgressPercentage(novelId))
  
  if (!novel || !chapter) {
    return <div className={styles.error}>Novel or chapter not found</div>
  }
  
  const handleNextChapter = () => {
    if (currentChapter < novel.totalChapters) {
      const nextChapter = currentChapter + 1
      setCurrentChapter(nextChapter)
      updateProgress(novelId, nextChapter, 0)
    }
  }
  
  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      const prevChapter = currentChapter - 1
      setCurrentChapter(prevChapter)
      updateProgress(novelId, prevChapter, 0)
    }
  }
  
  const handleBookmark = () => {
    const bookmarkId = `${novelId}-${chapter.id}-0`
    if (isBookmarked(novelId, chapter.id, 0)) {
      removeBookmark(bookmarkId)
    } else {
      addBookmark(novelId, chapter.id, chapter.chapterNumber, 0, chapter.title)
    }
  }
  
  const handleChapterSelect = (chapterNum: number) => {
    setCurrentChapter(chapterNum)
    updateProgress(novelId, chapterNum, 0)
  }
  
  return (
    <div className={styles.reader}>
      <div className={styles.header}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h1>{novel.title}</h1>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.progressText}>{Math.round(progress)}% complete</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.chapterNav}>
          <button 
            className={styles.navBtn} 
            onClick={handlePrevChapter}
            disabled={currentChapter === 1}
          >
            ← Previous
          </button>
          
          <div className={styles.chapterList}>
            <label>Chapter: </label>
            <select 
              value={currentChapter} 
              onChange={(e) => handleChapterSelect(Number(e.target.value))}
              className={styles.chapterSelect}
            >
              {Array.from({ length: novel.totalChapters }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Chapter {i + 1}
                </option>
              ))}
            </select>
            <span className={styles.chapterInfo}>
              {currentChapter} / {novel.totalChapters}
            </span>
          </div>
          
          <button 
            className={styles.navBtn} 
            onClick={handleNextChapter}
            disabled={currentChapter === novel.totalChapters}
          >
            Next →
          </button>
        </div>
        
        <div className={styles.chapterContent} style={{ fontSize: `${fontSize}px` }}>
          <h2>{chapter.title}</h2>
          <p>{chapter.content}</p>
        </div>
        
        <div className={styles.chapterActions}>
          <button 
            className={`${styles.actionBtn} ${isBookmarked(novelId, chapter.id, 0) ? styles.bookmarked : ''}`}
            onClick={handleBookmark}
          >
            {isBookmarked(novelId, chapter.id, 0) ? '🔖 Bookmarked' : '🔖 Bookmark Chapter'}
          </button>
        </div>
      </div>
      
      <div className={styles.bookmarks}>
        <h3>Bookmarks in this novel ({getBookmarks.length})</h3>
        {getBookmarks.length === 0 ? (
          <p className={styles.noBookmarks}>No bookmarks yet</p>
        ) : (
          <ul>
            {getBookmarks.map(bookmark => (
              <li key={bookmark.id} className={styles.bookmarkItem}>
                <span className={styles.bookmarkChapter}>Ch. {bookmark.chapterNumber}</span>
                <span className={styles.bookmarkQuote}>{bookmark.quote}</span>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Reader
