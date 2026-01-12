import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { MOCK_NOVELS } from './data'

const AppCtx = createContext(null)

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || fallback) } catch { return JSON.parse(fallback) }
}

export function AppProvider({ children }) {
  const [novels] = useState(MOCK_NOVELS)
  const [bookshelf, setBookshelf] = useState(() => readJSON('bookshelf', '[]'))
  const [bookmarks, setBookmarks] = useState(() => readJSON('bookmarks', '{}'))
  const [progress, setProgress] = useState(() => readJSON('progress', '{}'))
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('fontSize') || 16))
  const [query, setQuery] = useState('')
  const [activeNovelId, setActiveNovelId] = useState(novels[0].id)
  const [activeChapterId, setActiveChapterId] = useState(novels[0].chapters[0].id)

  useEffect(() => { try { localStorage.setItem('bookshelf', JSON.stringify(bookshelf)) } catch {} }, [bookshelf])
  useEffect(() => { try { localStorage.setItem('bookmarks', JSON.stringify(bookmarks)) } catch {} }, [bookmarks])
  useEffect(() => { try { localStorage.setItem('progress', JSON.stringify(progress)) } catch {} }, [progress])
  useEffect(() => { try { localStorage.setItem('theme', theme); document.documentElement.setAttribute('data-theme', theme) } catch {} }, [theme])
  useEffect(() => { try { localStorage.setItem('fontSize', String(fontSize)) } catch {} }, [fontSize])

  function addToBookshelf(novelId) { setBookshelf((s) => Array.from(new Set([].concat(s || [], novelId)))) }
  function removeFromBookshelf(novelId) { setBookshelf((s) => (s || []).filter((id) => id !== novelId)) }
  function toggleBookmark(novelId, chapterId) {
    setBookmarks((b) => {
      const key = `${novelId}|${chapterId}`
      const next = Object.assign({}, b || {})
      if (next[key]) delete next[key]
      else next[key] = { at: Date.now(), note: '' }
      return next
    })
  }
  function setProgressFor(novelId, chapterId, percent) {
    setProgress((p) => ({ ...(p || {}), [novelId]: { ...((p && p[novelId]) || {}), [chapterId]: percent } }))
  }
  function getNovel(id) { return (novels || []).find((n) => n.id === id) }

  const filtered = useMemo(() => {
    const q = String(query || '').trim().toLowerCase()
    if (!q) return novels
    return (novels || []).filter((n) => (n.title + n.author + n.desc).toLowerCase().includes(q))
  }, [novels, query])

  const value = {
    novels: filtered,
    allNovels: novels,
    bookshelf,
    addToBookshelf,
    removeFromBookshelf,
    bookmarks,
    toggleBookmark,
    progress,
    setProgressFor,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    query,
    setQuery,
    activeNovelId,
    setActiveNovelId,
    activeChapterId,
    setActiveChapterId,
    getNovel
  }

  return React.createElement(AppCtx.Provider, { value }, children)
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}