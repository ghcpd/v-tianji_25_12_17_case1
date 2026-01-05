import React from 'react'
import styles from './Bookshelf.module.css'
import { useNovelStore } from '../store'

interface BookshelfProps {
  onSelectNovel: (novelId: string) => void
}

export const Bookshelf: React.FC<BookshelfProps> = ({ onSelectNovel }) => {
  const bookshelfItems = useNovelStore(state => state.getBookshelfItems())
  const getNovelById = useNovelStore(state => state.getNovelById)
  const removeFromBookshelf = useNovelStore(state => state.removeFromBookshelf)
  const updateBookshelfStatus = useNovelStore(state => state.updateBookshelfStatus)
  const getProgressPercentage = useNovelStore(state => state.getProgressPercentage)
  
  const readingBooks = bookshelfItems.filter(item => item.status === 'reading')
  const completedBooks = bookshelfItems.filter(item => item.status === 'completed')
  const droppedBooks = bookshelfItems.filter(item => item.status === 'dropped')
  
  const renderBookList = (items: typeof bookshelfItems) => {
    return (
      <div className={styles.bookList}>
        {items.map(item => {
          const novel = getNovelById(item.novelId)
          if (!novel) return null
          
          const progress = getProgressPercentage(item.novelId)
          
          return (
            <div key={item.novelId} className={styles.bookItem}>
              <div className={styles.coverSmall}>{novel.cover}</div>
              <div className={styles.bookInfo}>
                <h4>{novel.title}</h4>
                <p className={styles.author}>{novel.author}</p>
                <div className={styles.progressSmall}>
                  <div className={styles.progressBarSmall}>
                    <div 
                      className={styles.progressFillSmall}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={styles.progressLabel}>{Math.round(progress)}%</span>
                </div>
              </div>
              <div className={styles.actions}>
                <select 
                  className={styles.statusSelect}
                  value={item.status}
                  onChange={(e) => updateBookshelfStatus(
                    item.novelId, 
                    e.target.value as 'reading' | 'completed' | 'dropped'
                  )}
                >
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                </select>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromBookshelf(item.novelId)}
                >
                  Remove
                </button>
                <button 
                  className={styles.readBtn}
                  onClick={() => onSelectNovel(item.novelId)}
                >
                  Read
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  
  return (
    <div className={styles.bookshelf}>
      <h2>My Bookshelf</h2>
      
      {bookshelfItems.length === 0 ? (
        <div className={styles.empty}>
          <p>Your bookshelf is empty</p>
          <p className={styles.hint}>Add novels from the browser to get started!</p>
        </div>
      ) : (
        <>
          {readingBooks.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>📖 Currently Reading ({readingBooks.length})</h3>
              {renderBookList(readingBooks)}
            </div>
          )}
          
          {completedBooks.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>✓ Completed ({completedBooks.length})</h3>
              {renderBookList(completedBooks)}
            </div>
          )}
          
          {droppedBooks.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>⊘ Dropped ({droppedBooks.length})</h3>
              {renderBookList(droppedBooks)}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Bookshelf
