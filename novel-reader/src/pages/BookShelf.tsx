import { useStore } from '../store'
import { Link } from 'react-router-dom'
import './BookShelf.css'

export default function BookShelf() {
  const bookshelf = useStore((s) => s.bookshelf)
  const novels = useStore((s) => s.novels)

  const books = Array.from(bookshelf)
    .map((id) => novels.find((n) => n.id === id))
    .filter(Boolean)

  return (
    <div className="bookshelf">
      <h1>Your Bookshelf</h1>
      {books.length === 0 ? (
        <p>No books added.</p>
      ) : (
        <ul>
          {books.map((n) => (
            <li key={n!.id}>
              <Link to={`/reader/${n!.id}/${n!.chapters[0].id}`}>{n!.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
