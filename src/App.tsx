import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NovelPage from './pages/NovelPage'
import ReaderPage from './pages/ReaderPage'
import BookshelfPage from './pages/BookshelfPage'
import SettingsPage from './pages/SettingsPage'
import useStore from './store/useStore'

export default function App() {
  const theme = useStore((s) => s.settings.theme)
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ?? 'light')
  }, [theme])

  return (
    <div className="min-h-screen p-4">
      <header className="container flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">Novel Reader</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-sm text-slate-600 hover:underline">
            Browse
          </Link>
          <Link to="/bookshelf" className="text-sm text-slate-600 hover:underline">
            Bookshelf
          </Link>
          <Link to="/settings" className="text-sm text-slate-600 hover:underline">
            Settings
          </Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/novel/:id" element={<NovelPage />} />
          <Route path="/novel/:id/chapter/:chapterId" element={<ReaderPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
