import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import styles from './Reader.module.css';

interface ReaderProps {
  novelId: string;
  onClose: () => void;
}

export function Reader({ novelId, onClose }: ReaderProps) {
  const {
    getNovel,
    getChaptersForNovel,
    getChapter,
    getReadingProgress,
    updateReadingProgress,
    addBookmark,
    getBookmarksForNovel,
    removeBookmark,
    preferences,
  } = useApp();

  const novel = getNovel(novelId);
  const chapters = getChaptersForNovel(novelId);
  const progress = getReadingProgress(novelId);
  const bookmarks = getBookmarksForNovel(novelId);

  const [currentChapterNumber, setCurrentChapterNumber] = useState(
    progress?.currentChapter || 1
  );
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [bookmarkNote, setBookmarkNote] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const currentChapter = chapters.find(c => c.chapterNumber === currentChapterNumber);

  useEffect(() => {
    if (currentChapter) {
      updateReadingProgress(novelId, currentChapterNumber, 0);
    }
  }, [currentChapterNumber, currentChapter, novelId, updateReadingProgress]);

  useEffect(() => {
    if (contentRef.current && progress?.position) {
      contentRef.current.scrollTop = progress.position;
    }
  }, [currentChapter, progress?.position]);

  const handleScroll = () => {
    if (contentRef.current) {
      updateReadingProgress(novelId, currentChapterNumber, contentRef.current.scrollTop);
    }
  };

  const handleAddBookmark = () => {
    if (currentChapter) {
      const position = contentRef.current?.scrollTop || 0;
      addBookmark(novelId, currentChapter.id, position, bookmarkNote);
      setBookmarkNote('');
      setShowBookmarks(true);
    }
  };

  const handleGoToBookmark = (chapterId: string, position: number) => {
    const chapter = getChapter(chapterId);
    if (chapter) {
      setCurrentChapterNumber(chapter.chapterNumber);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = position;
        }
      }, 100);
      setShowBookmarks(false);
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapterNumber > 1) {
      setCurrentChapterNumber(currentChapterNumber - 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const goToNextChapter = () => {
    if (currentChapterNumber < chapters.length) {
      setCurrentChapterNumber(currentChapterNumber + 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  if (!novel || !currentChapter) {
    return <div>Novel not found</div>;
  }

  const progressPercentage = (currentChapterNumber / novel.totalChapters) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button onClick={onClose} className={styles.toolButton}>
          ← Back
        </button>
        <div className={styles.novelInfo}>
          <h2>{novel.title}</h2>
          <span>Chapter {currentChapterNumber} of {novel.totalChapters}</span>
        </div>
        <div className={styles.toolButtons}>
          <button
            onClick={() => setShowChapterList(!showChapterList)}
            className={styles.toolButton}
          >
            Chapters
          </button>
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={styles.toolButton}
          >
            Bookmarks ({bookmarks.length})
          </button>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className={styles.main}>
        {showChapterList && (
          <div className={styles.sidebar}>
            <h3>Chapters</h3>
            <div className={styles.chapterList}>
              {chapters.map(chapter => (
                <button
                  key={chapter.id}
                  className={`${styles.chapterItem} ${
                    chapter.chapterNumber === currentChapterNumber ? styles.active : ''
                  }`}
                  onClick={() => {
                    setCurrentChapterNumber(chapter.chapterNumber);
                    setShowChapterList(false);
                  }}
                >
                  <span className={styles.chapterNumber}>{chapter.chapterNumber}</span>
                  <span className={styles.chapterTitle}>{chapter.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {showBookmarks && (
          <div className={styles.sidebar}>
            <h3>Bookmarks</h3>
            <div className={styles.bookmarkForm}>
              <input
                type="text"
                placeholder="Add a note..."
                value={bookmarkNote}
                onChange={(e) => setBookmarkNote(e.target.value)}
                className={styles.bookmarkInput}
              />
              <button onClick={handleAddBookmark} className={styles.addBookmarkButton}>
                Add Bookmark
              </button>
            </div>
            <div className={styles.bookmarkList}>
              {bookmarks.length > 0 ? (
                bookmarks.map(bookmark => {
                  const chapter = getChapter(bookmark.chapterId);
                  return (
                    <div key={bookmark.id} className={styles.bookmarkItem}>
                      <div className={styles.bookmarkInfo}>
                        <strong>Chapter {chapter?.chapterNumber}: {chapter?.title}</strong>
                        {bookmark.note && <p>{bookmark.note}</p>}
                        <small>{bookmark.createdAt.toLocaleDateString()}</small>
                      </div>
                      <div className={styles.bookmarkActions}>
                        <button
                          onClick={() => handleGoToBookmark(bookmark.chapterId, bookmark.position)}
                          className={styles.bookmarkAction}
                        >
                          Go
                        </button>
                        <button
                          onClick={() => removeBookmark(bookmark.id)}
                          className={styles.bookmarkAction}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className={styles.emptyBookmarks}>No bookmarks yet</p>
              )}
            </div>
          </div>
        )}

        <div
          ref={contentRef}
          className={styles.content}
          onScroll={handleScroll}
          style={{
            fontSize: `${preferences.fontSize}px`,
            fontFamily: preferences.fontFamily,
          }}
        >
          <h1 className={styles.chapterTitle}>
            Chapter {currentChapter.chapterNumber}: {currentChapter.title}
          </h1>
          <div className={styles.chapterContent}>
            {currentChapter.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.navigation}>
            <button
              onClick={goToPreviousChapter}
              disabled={currentChapterNumber === 1}
              className={styles.navButton}
            >
              ← Previous Chapter
            </button>
            <button
              onClick={goToNextChapter}
              disabled={currentChapterNumber === chapters.length}
              className={styles.navButton}
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
