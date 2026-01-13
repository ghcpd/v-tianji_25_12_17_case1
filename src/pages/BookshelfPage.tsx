import React from 'react'
import useStore from '../store/useStore'
import { Link } from 'react-router-dom'

export default function BookshelfPage() {
  const ids = useStore((s) => s.bookshelf)
  const novels = useStore((s) => s.novels)
  const remove = useStore((s) => s.removeFromBookshelf)

  const items = ids.map((id) => novels.find((n) => n.id === id)!).filter(Boolean)

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">My Bookshelf</h2>
      {items.length === 0 && <div className="text-sm text-slate-500">Your bookshelf is empty</div>}
      <ul className="space-y-2">
        {items.map((n) => (
          <li key={n.id} className="p-3 border rounded bg-white/80 flex justify-between items-center">
            <div>
              <Link to={`/novel/${n.id}`} className="font-medium text-indigo-700">
                {n.title}
              </Link>
              <div className="text-sm text-slate-500">{n.author}</div>
            </div>
            <div>
              <button onClick={() => remove(n.id)} className="px-3 py-1 rounded border text-sm">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
