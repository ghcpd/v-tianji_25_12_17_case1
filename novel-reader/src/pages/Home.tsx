import { Link } from 'react-router-dom'
import { useStore } from '../store'
import './Home.css'

export default function Home() {
  const novels = useStore((s) => s.novels)
  const setCurrentNovel = useStore((s) => s.setCurrentNovel)
  const toggleBookshelf = useStore((s) => s.toggleBookshelf)
  const bookshelf = useStore((s) => s.bookshelf)

  return (
    <div className="home">
      <h1>Novel Library</h1>
      <ul>
        {novels.map((n) => (
          <li key={n.id}>
            <Link
              to={`/reader/${n.id}/${n.chapters[0].id}`}
              onClick={() => setCurrentNovel(n.id)}
            >
              {n.title} — {n.author}
            </Link>
            <button onClick={() => toggleBookshelf(n.id)}>
              {bookshelf.has(n.id) ? 'Remove from Bookshelf' : 'Add to Bookshelf'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
