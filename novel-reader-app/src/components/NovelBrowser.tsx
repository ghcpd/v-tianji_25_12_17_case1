import { useState } from 'react';
import { useApp } from '../context/AppContext';
import styles from './NovelBrowser.module.css';
import { NovelCard } from './NovelCard';

interface NovelBrowserProps {
  onNovelSelect: (novelId: string) => void;
}

export function NovelBrowser({ onNovelSelect }: NovelBrowserProps) {
  const { novels, bookshelf } = useApp();
  const [filter, setFilter] = useState<'all' | 'bookshelf'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNovels = novels.filter(novel => {
    const matchesFilter = filter === 'all' || bookshelf.includes(novel.id);
    const matchesSearch = novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         novel.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         novel.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Novel Library</h1>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search novels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filterButtons}>
            <button
              className={filter === 'all' ? styles.active : ''}
              onClick={() => setFilter('all')}
            >
              All Novels
            </button>
            <button
              className={filter === 'bookshelf' ? styles.active : ''}
              onClick={() => setFilter('bookshelf')}
            >
              My Bookshelf ({bookshelf.length})
            </button>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        {filteredNovels.length > 0 ? (
          filteredNovels.map(novel => (
            <NovelCard
              key={novel.id}
              novel={novel}
              onSelect={onNovelSelect}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No novels found</p>
            {filter === 'bookshelf' && <p>Add some novels to your bookshelf to see them here!</p>}
          </div>
        )}
      </div>
    </div>
  );
}
