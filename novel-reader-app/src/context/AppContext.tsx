import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Novel, Chapter, Bookmark, ReadingProgress, UserPreferences } from '../types';
import { mockNovels, mockChapters } from '../data/mockData';

interface AppContextType {
  // Data
  novels: Novel[];
  chapters: Chapter[];
  bookmarks: Bookmark[];
  readingProgress: Map<string, ReadingProgress>;
  bookshelf: string[];
  preferences: UserPreferences;
  
  // Actions
  addToBookshelf: (novelId: string) => void;
  removeFromBookshelf: (novelId: string) => void;
  isInBookshelf: (novelId: string) => boolean;
  
  addBookmark: (novelId: string, chapterId: string, position: number, note: string) => void;
  removeBookmark: (id: string) => void;
  getBookmarksForNovel: (novelId: string) => Bookmark[];
  
  updateReadingProgress: (novelId: string, chapterNumber: number, position: number) => void;
  getReadingProgress: (novelId: string) => ReadingProgress | undefined;
  
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  
  getChaptersForNovel: (novelId: string) => Chapter[];
  getChapter: (chapterId: string) => Chapter | undefined;
  getNovel: (novelId: string) => Novel | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKSHELF: 'novel-reader-bookshelf',
  BOOKMARKS: 'novel-reader-bookmarks',
  PROGRESS: 'novel-reader-progress',
  PREFERENCES: 'novel-reader-preferences',
};

const defaultPreferences: UserPreferences = {
  fontSize: 16,
  theme: 'light',
  fontFamily: 'Georgia, serif',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [novels] = useState<Novel[]>(mockNovels);
  const [chapters] = useState<Chapter[]>(mockChapters);
  const [bookshelf, setBookshelf] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [readingProgress, setReadingProgress] = useState<Map<string, ReadingProgress>>(new Map());
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBookshelf = localStorage.getItem(STORAGE_KEYS.BOOKSHELF);
    const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    const savedPreferences = localStorage.getItem(STORAGE_KEYS.PREFERENCES);

    if (savedBookshelf) {
      setBookshelf(JSON.parse(savedBookshelf));
    }
    
    if (savedBookmarks) {
      const parsed = JSON.parse(savedBookmarks);
      setBookmarks(parsed.map((b: any) => ({
        ...b,
        createdAt: new Date(b.createdAt)
      })));
    }
    
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const progressMap = new Map();
      Object.entries(parsed).forEach(([key, value]: [string, any]) => {
        progressMap.set(key, {
          ...value,
          lastReadAt: new Date(value.lastReadAt)
        });
      });
      setReadingProgress(progressMap);
    }
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Save bookshelf to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKSHELF, JSON.stringify(bookshelf));
  }, [bookshelf]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save reading progress to localStorage
  useEffect(() => {
    const progressObj = Object.fromEntries(readingProgress);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressObj));
  }, [readingProgress]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', preferences.theme);
    document.documentElement.style.fontSize = `${preferences.fontSize}px`;
  }, [preferences]);

  const addToBookshelf = useCallback((novelId: string) => {
    setBookshelf(prev => (prev.includes(novelId) ? prev : [...prev, novelId]));
  }, []);

  const removeFromBookshelf = useCallback((novelId: string) => {
    setBookshelf(prev => prev.filter(id => id !== novelId));
  }, []);

  const isInBookshelf = useCallback((novelId: string): boolean => {
    return bookshelf.includes(novelId);
  }, [bookshelf]);

  const addBookmark = useCallback((novelId: string, chapterId: string, position: number, note: string) => {
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      novelId,
      chapterId,
      position,
      note,
      createdAt: new Date(),
    };
    setBookmarks(prev => [...prev, newBookmark]);
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const getBookmarksForNovel = useCallback((novelId: string): Bookmark[] => {
    return bookmarks.filter(b => b.novelId === novelId);
  }, [bookmarks]);

  const updateReadingProgress = useCallback((novelId: string, chapterNumber: number, position: number) => {
    setReadingProgress(prev => {
      const newProgress = new Map(prev);
      newProgress.set(novelId, {
        novelId,
        currentChapter: chapterNumber,
        position,
        lastReadAt: new Date(),
      });
      return newProgress;
    });
  }, []);

  const getReadingProgress = useCallback((novelId: string): ReadingProgress | undefined => {
    return readingProgress.get(novelId);
  }, [readingProgress]);

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  const getChaptersForNovel = useCallback((novelId: string): Chapter[] => {
    return chapters.filter(c => c.novelId === novelId).sort((a, b) => a.chapterNumber - b.chapterNumber);
  }, [chapters]);

  const getChapter = useCallback((chapterId: string): Chapter | undefined => {
    return chapters.find(c => c.id === chapterId);
  }, [chapters]);

  const getNovel = useCallback((novelId: string): Novel | undefined => {
    return novels.find(n => n.id === novelId);
  }, [novels]);

  const value: AppContextType = useMemo(() => ({
    novels,
    chapters,
    bookmarks,
    readingProgress,
    bookshelf,
    preferences,
    addToBookshelf,
    removeFromBookshelf,
    isInBookshelf,
    addBookmark,
    removeBookmark,
    getBookmarksForNovel,
    updateReadingProgress,
    getReadingProgress,
    updatePreferences,
    getChaptersForNovel,
    getChapter,
    getNovel,
  }), [
    novels,
    chapters,
    bookmarks,
    readingProgress,
    bookshelf,
    preferences,
    addToBookshelf,
    removeFromBookshelf,
    isInBookshelf,
    addBookmark,
    removeBookmark,
    getBookmarksForNovel,
    updateReadingProgress,
    getReadingProgress,
    updatePreferences,
    getChaptersForNovel,
    getChapter,
    getNovel,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
