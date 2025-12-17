import React from 'react'
import useStore from '../store/useStore'

export default function SettingsPage() {
  const theme = useStore((s) => s.settings.theme)
  const fontSize = useStore((s) => s.settings.fontSize)
  const setTheme = useStore((s) => s.setTheme)
  const setFontSize = useStore((s) => s.setFontSize)

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium">Theme</div>
          <div className="mt-2">
            <button onClick={() => setTheme('light')} className={`px-3 py-1 mr-2 ${theme === 'light' ? 'bg-slate-200' : ''}`}>
              Light
            </button>
            <button onClick={() => setTheme('dark')} className={`${theme === 'dark' ? 'bg-slate-700 text-white' : ''} px-3 py-1`}>
              Dark
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Font size</div>
          <div className="mt-2 flex items-center gap-2">
            <button onClick={() => setFontSize(Math.max(12, fontSize - 1))} className="px-2 py-1 border rounded">
              -
            </button>
            <div className="w-12 text-center">{fontSize}px</div>
            <button onClick={() => setFontSize(Math.min(36, fontSize + 1))} className="px-2 py-1 border rounded">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
