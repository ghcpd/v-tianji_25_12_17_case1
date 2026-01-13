import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

export default function HomePage() {
  const novels = useStore((s) => s.novels)
  const progress = useStore((s) => s.progress)
  const addToBookshelf = useStore((s) => s.addToBookshelf)

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Browse Novels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {novels.map((n) => (
          <article key={n.id} className="p-4 border rounded bg-white/80 shadow-sm">
            <h3 className="text-lg font-semibold">{n.title}</h3>
            <p className="text-sm text-slate-600">{n.author}</p>
            <p className="mt-2 text-sm text-slate-700">{n.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <Link to={`/novel/${n.id}`} className="text-indigo-600 hover:underline">
                View
              </Link>
              <div className="text-sm text-slate-500">Progress: {Math.round(progress[n.id] || 0)}%</div>
            </div>
            <button
              onClick={() => addToBookshelf(n.id)}
              className="mt-3 inline-block px-3 py-1 text-sm bg-indigo-600 text-white rounded"
            >
              Add to Bookshelf
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
