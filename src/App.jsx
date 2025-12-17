import React from 'react'
import { AppProvider, useApp } from './state'

function Header() {
  const { theme, setTheme, query, setQuery, fontSize, setFontSize, allNovels } = useApp()
  return (
    <div className="header">
      <div className="brand">
        <div className="logo">NR</div>
        <div>
          <div className="title">Novel Reader</div>
          <div className="small-muted">Browse, read, and curate your bookshelf — mock data</div>
        </div>
      </div>

      <div className="controls">
        <div className="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 21l-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input className="input" placeholder={`Search ${allNovels.length} novels`} value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>

        <div className="switch" title="Theme">
          <button aria-label="theme" className="btn-ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '🌙' : '☀️'}</button>
        </div>

        <div className="switch" title="Font size">
          <button className="btn" onClick={() => setFontSize((s) => Math.max(12, s - 1))}>A-</button>
          <div className="small-muted" style={{ minWidth: 34, textAlign: 'center' }}>{fontSize}px</div>
          <button className="btn" onClick={() => setFontSize((s) => Math.min(24, s + 1))}>A+</button>
        </div>

      </div>
    </div>
  )
}

function NovelList() {
  const { novels, addToBookshelf, bookshelf, setActiveNovelId, activeNovelId, setActiveChapterId, getNovel } = useApp()
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontWeight:700}}>Explore Novels</div>
        <div className="badge">{novels.length} results</div>
      </div>

      <div className="list">
        {novels.map((n) => (
          <div key={n.id} className="novel" style={{border: n.id===activeNovelId ? '1px solid rgba(124,58,237,0.18)' : 'transparent', padding:10}}>
            <div className="poster" onClick={() => { setActiveNovelId(n.id); setActiveChapterId(n.chapters[0].id) }}>{n.cover}</div>
            <div>
              <h4>{n.title}</h4>
              <p className="small-muted">{n.author} · {n.desc}</p>

              <div className="chapters">
                {n.chapters.slice(0,3).map((c) => (
                  <div key={c.id} className="chap" style={{display:'flex',alignItems:'center'}}>
                    <div style={{fontSize:13}}>{c.title}</div>
                    <div className="meta">{c.words} words</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="meta" style={{marginLeft:12}}>
              <div className="small-muted">{n.chapters.length} chapters</div>
              <div style={{height:8}} />
              <button className="bookmark-btn" onClick={() => addToBookshelf(n.id)}>{bookshelf.includes(n.id) ? 'In Bookshelf' : 'Add'}</button>
            </div>
          </div>
        ))}

        {novels.length === 0 && <div className="empty card">No novels match your search.</div>}
      </div>
    </div>
  )
}

function Sidebar() {
  const { bookshelf, allNovels, setActiveNovelId, setActiveChapterId, bookmarks, toggleBookmark, progress, getNovel } = useApp()
  const shelf = bookshelf.map((id) => allNovels.find((n)=>n.id===id)).filter(Boolean)
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontWeight:700}}>Bookshelf</div>
        <div className="small-muted">{shelf.length}</div>
      </div>

      {shelf.length === 0 && <div className="empty">Your bookshelf is empty — add novels to keep them handy.</div>}

      <div className="list">
        {shelf.map((n) => (
          <div key={n.id} style={{display:'flex',gap:12,alignItems:'center'}}>
            <div className="poster" style={{width:56,height:78}} onClick={() => { setActiveNovelId(n.id); setActiveChapterId(n.chapters[0].id) }}>{n.cover}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{n.title}</div>
              <div className="small-muted">{n.author}</div>
              <div style={{height:8}} />
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <div className="small-muted">Progress</div>
                <div className="progress" style={{width:120}}><i style={{width: `${Math.round((Object.values(progress[n.id]||{}).reduce((a,b)=>a+b,0) / ( (n.chapters.length||1) * 100) )*100)}%`}} /></div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="small-muted">{n.chapters.length} ch</div>
              <div style={{height:8}} />
              <button className="btn" onClick={() => toggleBookmark(n.id, n.chapters[0].id)}>{bookmarks[`${n.id}|${n.chapters[0].id}`] ? 'Bookmarked' : 'Bookmark'}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="small-muted">Bookmarks: {Object.keys(bookmarks).length}</div>
        <div className="small-muted">Theme sync</div>
      </div>
    </div>
  )
}

function Reader() {
  const { getNovel, activeNovelId, activeChapterId, setActiveChapterId, setProgressFor, progress, toggleBookmark, bookmarks, fontSize } = useApp()
  const novel = getNovel(activeNovelId)
  const chapter = novel?.chapters.find((c) => c.id === activeChapterId) || novel?.chapters?.[0]
  if (!novel) return <div className="card">No novel selected</div>

  const currentProgress = (progress[novel.id] && progress[novel.id][chapter.id]) || 0

  return (
    <div className="card reader">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <div style={{fontWeight:800,fontSize:16}}>{novel.title}</div>
          <div className="small-muted">{novel.author} · <span className="small">{chapter.title}</span></div>
        </div>

        <div style={{textAlign:'right'}}>
          <div className="small-muted">{chapter.words} words</div>
          <div style={{height:10}} />
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button className="btn" onClick={() => setActiveChapterId(novel.chapters[Math.max(0, novel.chapters.findIndex((c)=>c.id===chapter.id)-1)].id)}>Prev</button>
            <button className="btn" onClick={() => setActiveChapterId(novel.chapters[Math.min(novel.chapters.length-1, novel.chapters.findIndex((c)=>c.id===chapter.id)+1)].id)}>Next</button>
            <button className="btn" onClick={() => toggleBookmark(novel.id, chapter.id)}>{bookmarks[`${novel.id}|${chapter.id}`] ? '★' : '☆'}</button>
          </div>
        </div>
      </div>

      <div className="toolbar" style={{marginTop:14,marginBottom:6}}>
        <div className="small-muted">Font size</div>
        <div className="badge">{fontSize}px</div>

        <div style={{width:8}} />
        <div className="small-muted">Reading progress</div>
        <div style={{width:140}}>
          <input className="slider" type="range" min="0" max="100" value={currentProgress} onChange={(e)=>setProgressFor(novel.id, chapter.id, Number(e.target.value))} />
        </div>
        <div style={{minWidth:40,textAlign:'right'}} className="small-muted">{currentProgress}%</div>

        <div style={{flex:1}} />
        <div className="small-muted">Bookmarks</div>
        <div style={{width:8}} />
        <div className="badge">{Object.keys(bookmarks).filter(k=>k.startsWith(novel.id+'|')).length}</div>
      </div>

      <div style={{marginTop:8, padding:18, borderRadius:8, background:'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)', fontSize: fontSize, lineHeight:1.6, whiteSpace:'pre-wrap'}}>
        {chapter.body}
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14}}>
        <div className="small-muted">Chapter {novel.chapters.findIndex((c)=>c.id===chapter.id)+1} of {novel.chapters.length}</div>
        <div className="small-muted">Last saved: {currentProgress}%</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <div className="container">
        <Header />
        <div className="grid">
          <div>
            <NovelList />
            <div style={{height:20}} />
            <Reader />
          </div>
          <Sidebar />
        </div>

        <div style={{height:20}} />
        <div style={{textAlign:'center', color:'var(--muted)', fontSize:13}}>Built with mock data · No backend · Local state persisted to localStorage</div>
      </div>
    </AppProvider>
  )
}
