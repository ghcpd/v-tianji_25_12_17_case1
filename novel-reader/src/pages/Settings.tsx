import { useStore } from '../store'

export default function Settings() {
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)
  const fontSize = useStore((s) => s.fontSize)
  const setFontSize = useStore((s) => s.setFontSize)

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Font size:
          <input
            type="range"
            min={12}
            max={24}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          />
          {fontSize}px
        </label>
      </div>
    </div>
  )
}
