import { Link } from 'react-router-dom'
import { useStore } from '../store'

import './NavBar.css'

export default function NavBar() {
  const theme = useStore((s) => s.theme)
  return (
    <nav className={`navbar ${theme}`}>
      <Link to="/">Home</Link>
      <Link to="/bookshelf">Bookshelf</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  )
}
