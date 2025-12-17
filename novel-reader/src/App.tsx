import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Reader from './pages/Reader'
import BookShelf from './pages/BookShelf'
import Settings from './pages/Settings'

import { useEffect } from 'react'
import { useStore } from './store'

function App() {
  const theme = useStore((s) => s.theme)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reader/:novelId/:chapterId" element={<Reader />} />
        <Route path="/bookshelf" element={<BookShelf />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
