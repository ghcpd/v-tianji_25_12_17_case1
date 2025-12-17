import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { AppState, Novel, Bookmark, ReadingProgress } from '../types';
import { mockNovels } from '../mockData';

type Action =
  | { type: 'ADD_TO_BOOKSHELF'; payload: string }
  | { type: 'REMOVE_FROM_BOOKSHELF'; payload: string }
  | { type: 'ADD_BOOKMARK'; payload: Bookmark }
  | { type: 'REMOVE_BOOKMARK'; payload: string }
  | { type: 'UPDATE_PROGRESS'; payload: ReadingProgress }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_FONT_SIZE'; payload: number };

const initialState: AppState = {
  novels: mockNovels,
  bookshelf: [],
  bookmarks: [],
  progress: [],
  theme: 'light',
  fontSize: 16,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_BOOKSHELF':
      return { ...state, bookshelf: [...state.bookshelf, action.payload] };
    case 'REMOVE_FROM_BOOKSHELF':
      return { ...state, bookshelf: state.bookshelf.filter(id => id !== action.payload) };
    case 'ADD_BOOKMARK':
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case 'REMOVE_BOOKMARK':
      return { ...state, bookmarks: state.bookmarks.filter(b => b.id !== action.payload) };
    case 'UPDATE_PROGRESS':
      const existing = state.progress.find(p => p.novelId === action.payload.novelId && p.chapterId === action.payload.chapterId);
      if (existing) {
        return {
          ...state,
          progress: state.progress.map(p =>
            p.novelId === action.payload.novelId && p.chapterId === action.payload.chapterId ? action.payload : p
          ),
        };
      }
      return { ...state, progress: [...state.progress, action.payload] };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};