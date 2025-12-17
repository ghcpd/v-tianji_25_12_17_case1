import React from 'react'
import styles from './NovelBrowser.module.css'
import { useNovelStore } from '../store'

interface NovelBrowserProps {
  onSelectNovel: (novelId: string) => void
  selectedNovelId?: string
}

export const NovelBrowser: React.FC<NovelBrowserProps> = ({ onSelectNovel, selectedNovelId }) => {
  const novels = useNovelStore(state => state.getNovels())
  
  return (
    <div className={styles.browser}>
      <h2>Browse Novels</h2>
      <div className={styles.grid}>
        {novels.map(novel => (
          <div
            key={novel.id}
            className={`${styles.novelCard} ${selectedNovelId === novel.id ? styles.selected : ''}`}
            onClick={() => onSelectNovel(novel.id)}
          >
            <div className={styles.cover}>{novel.cover}</div>
            <div className={styles.info}>
              <h3>{novel.title}</h3>
              <p className={styles.author}>{novel.author}</p>
              <div className={styles.meta}>
                <span className={styles.rating}>⭐ {novel.rating}</span>
                <span className={styles.chapters}>{novel.totalChapters} chapters</span>
              </div>
              <div className={styles.genres}>
                {novel.genre.map(g => (
                  <span key={g} className={styles.genre}>{g}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NovelBrowser
