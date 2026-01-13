import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useStore from '../store/useStore'

export default function NovelPage() {
  const { id } = useParams()
  const novel = useStore((s) => s.novels.find((n) => n.id === id))

  if (!novel) return <div>Novel not found</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold">{novel.title}</h2>
      <p className="text-sm text-slate-600">{novel.author}</p>
      <p className="mt-2">{novel.description}</p>
      <h3 className="mt-4 font-medium">Chapters</h3>
      <ul className="mt-2 space-y-2">
        {novel.chapters.map((c) => (
          <li key={c.id} className="p-2 border rounded bg-white/80">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-slate-500">{c.content.slice(0, 80)}...</div>
              </div>
              <Link to={`/novel/${novel.id}/chapter/${c.id}`} className="text-indigo-600 hover:underline">
                Read
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
