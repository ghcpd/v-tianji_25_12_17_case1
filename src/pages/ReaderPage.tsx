import React from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store/useStore'

export default function ReaderPage() {
  const { id, chapterId } = useParams()
  const novel = useStore((s) => s.novels.find((n) => n.id === id))
  const setBookmark = useStore((s) => s.setBookmark)
  const setProgress = useStore((s) => s.setProgress)
  const settings = useStore((s) => s.settings)
  const bookmarks = useStore((s) => s.bookmarks)

  const chapter = novel?.chapters.find((c) => c.id === chapterId)

  if (!novel || !chapter) return <div>Chapter not found</div>

  const key = `${novel.id}:${chapter.id}`
  const bookmarkedPos = bookmarks[key]

  const [position, setPosition] = React.useState<number>(bookmarkedPos ?? 0)

  React.useEffect(() => {
    const percent = Math.min(100, Math.round((position / Math.max(1, chapter.content.length)) * 100))
    setProgress(novel.id, percent)
  }, [position])

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{novel.title}</h2>
          <p className="text-sm text-slate-600">{chapter.title}</p>
        </div>
        <div className="text-sm text-slate-500">{Math.round((position / Math.max(1, chapter.content.length)) * 100)}%</div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm">Font size</label>
          <button onClick={() => useStore.getState().setFontSize(Math.max(12, settings.fontSize - 2))} className="px-2 py-1 border rounded">
            A-
          </button>
          <button onClick={() => useStore.getState().setFontSize(Math.min(36, settings.fontSize + 2))} className="px-2 py-1 border rounded">
            A+
          </button>

          <button
            onClick={() => setBookmark(novel.id, chapter.id, position)}
            className="ml-4 px-2 py-1 rounded bg-yellow-300 text-sm"
            aria-label="bookmark"
          >
            Bookmark
          </button>
        </div>

        <div className="p-4 bg-white/80 rounded reader-content" style={{ fontSize: settings.fontSize }}>
          <div>{chapter.content}</div>
        </div>

        <div className="mt-4">
          <label className="text-sm">Reading position</label>
          <input
            aria-label="position"
            type="range"
            min={0}
            max={chapter.content.length}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-slate-500">Position: {position} / {chapter.content.length}</div>
        </div>
      </div>
    </div>
  )
}
