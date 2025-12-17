import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store'
import './Reader.css'

export default function Reader() {
  const { novelId, chapterId } = useParams<{ novelId: string; chapterId: string }>()
  const setCurrentChapter = useStore((s) => s.setCurrentChapter)
  const advanceChapter = useStore((s) => s.advanceChapter)
  const fontSize = useStore((s) => s.fontSize)
  const theme = useStore((s) => s.theme)
  const addBookmark = useStore((s) => s.toggleBookmark)
  const emptyBookmarks: Bookmark[] = []
  const bookmarks = useStore((s) => s.bookmarks[novelId] ?? emptyBookmarks)
  const setReadingProgress = useStore((s) => s.setReadingProgress)


  const novel = useStore((s) => s.novels.find((n) => n.id === novelId))
  const chapter = novel?.chapters.find((c) => c.id === chapterId)

  if (!novel || !chapter) return <div>Not found</div>

  const idx = novel.chapters.findIndex((c) => c.id === chapterId)

  const handleBookmark = () => {
    const excerpt = chapter.content.slice(0, 50)
    addBookmark(novel.id, chapter.id, excerpt)
  }

  return (
    <div className={`reader ${theme}`} style={{ fontSize: `${fontSize}px` }}>
      <h2>{novel.title} — {chapter.title}</h2>
      <div className="progress">
        <progress value={idx + 1} max={novel.chapters.length} />
        <span>{idx + 1} / {novel.chapters.length}</span>
      </div>
      <div className="content">{chapter.content}</div>
      <div className="actions">
        <button onClick={handleBookmark}>{
          bookmarks.find((b) => b.chapterId === chapter.id) ? 'Remove Bookmark' : 'Add Bookmark'
        }</button>
      </div>
      <div className="navButtons">
        {idx > 0 && (
          <Link to={`/reader/${novel.id}/${novel.chapters[idx - 1].id}`}>
            Previous
          </Link>
        )}
        {idx < novel.chapters.length - 1 && (
          <Link to={`/reader/${novel.id}/${novel.chapters[idx + 1].id}`}>
            Next
          </Link>
        )}
      </div>
      {bookmarks.length > 0 && (
        <div className="bookmarks">
          <h3>Bookmarks</h3>
          <ul>
            {bookmarks.map((b, i) => (
              <li key={i}>{b.excerpt} <button onClick={() => addBookmark(novel.id, b.chapterId, b.excerpt)}>Remove</button></li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/">← Back to library</Link>
    </div>
  )
}
