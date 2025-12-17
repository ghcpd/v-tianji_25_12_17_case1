import type { Novel } from '../types';
import { useApp } from '../context/AppContext';
import styles from './NovelCard.module.css';

interface NovelCardProps {
  novel: Novel;
  onSelect: (novelId: string) => void;
}

export function NovelCard({ novel, onSelect }: NovelCardProps) {
  const { isInBookshelf, addToBookshelf, removeFromBookshelf, getReadingProgress } = useApp();
  const inBookshelf = isInBookshelf(novel.id);
  const progress = getReadingProgress(novel.id);
  const progressPercentage = progress ? (progress.currentChapter / novel.totalChapters) * 100 : 0;

  const handleBookshelfToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inBookshelf) {
      removeFromBookshelf(novel.id);
    } else {
      addToBookshelf(novel.id);
    }
  };

  return (
    <div className={styles.card} onClick={() => onSelect(novel.id)}>
      <div className={styles.coverContainer}>
        <img src={novel.coverImage} alt={novel.title} className={styles.cover} />
        <div className={styles.category}>{novel.category}</div>
        <button
          className={`${styles.bookshelfButton} ${inBookshelf ? styles.active : ''}`}
          onClick={handleBookshelfToggle}
          aria-label={inBookshelf ? 'Remove from bookshelf' : 'Add to bookshelf'}
        >
          {inBookshelf ? '★' : '☆'}
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{novel.title}</h3>
        <p className={styles.author}>by {novel.author}</p>
        <p className={styles.description}>{novel.description}</p>
        <div className={styles.meta}>
          <span>{novel.totalChapters} chapters</span>
          {progress && (
            <span className={styles.progress}>
              {Math.round(progressPercentage)}% read
            </span>
          )}
        </div>
        {progress && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
