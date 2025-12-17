import { describe, it, expect, beforeEach } from 'vitest'
import { useNovelStore } from '../store'
import { mockNovels, mockChapters } from '../mockData'

describe('Store - Novels and Chapters', () => {
  beforeEach(() => {
    useNovelStore.setState({
      novels: mockNovels,
      readingProgress: {},
      bookshelf: {},
      bookmarks: [],
      currentTheme: 'light',
      fontSize: 16
    })
  })

  it('should retrieve all novels', () => {
    const novels = useNovelStore.getState().getNovels()
    expect(novels).toHaveLength(5)
    expect(novels[0].title).toBe('The Echoing Corridors')
  })

  it('should find a novel by ID', () => {
    const novel = useNovelStore.getState().getNovelById('novel-1')
    expect(novel).toBeDefined()
    expect(novel?.title).toBe('The Echoing Corridors')
    expect(novel?.totalChapters).toBe(24)
  })

  it('should return undefined for non-existent novel', () => {
    const novel = useNovelStore.getState().getNovelById('non-existent')
    expect(novel).toBeUndefined()
  })

  it('should retrieve chapters for a novel', () => {
    const chapters = useNovelStore.getState().getChapters('novel-1')
    expect(chapters).toHaveLength(24)
    expect(chapters[0].chapterNumber).toBe(1)
    expect(chapters[23].chapterNumber).toBe(24)
  })

  it('should get a specific chapter by number', () => {
    const chapter = useNovelStore.getState().getChapter('novel-1', 1)
    expect(chapter).toBeDefined()
    expect(chapter?.title).toContain('The Beginning')
    expect(chapter?.content).toContain('Chapter 1')
  })

  it('should return undefined for non-existent chapter', () => {
    const chapter = useNovelStore.getState().getChapter('novel-1', 999)
    expect(chapter).toBeUndefined()
  })

  it('should get chapters from different novels', () => {
    const chaptersNovel1 = useNovelStore.getState().getChapters('novel-1')
    const chaptersNovel2 = useNovelStore.getState().getChapters('novel-2')
    
    expect(chaptersNovel1).toHaveLength(24)
    expect(chaptersNovel2).toHaveLength(32)
    expect(chaptersNovel1[0].novelId).toBe('novel-1')
    expect(chaptersNovel2[0].novelId).toBe('novel-2')
  })
})

describe('Store - Reading Progress', () => {
  beforeEach(() => {
    useNovelStore.setState({
      novels: mockNovels,
      readingProgress: {},
      bookshelf: {},
      bookmarks: [],
      currentTheme: 'light',
      fontSize: 16
    })
  })

  it('should update reading progress', () => {
    useNovelStore.getState().updateReadingProgress('novel-1', 5, 0)
    const progress = useNovelStore.getState().getReadingProgress('novel-1')
    
    expect(progress).toBeDefined()
    expect(progress?.currentChapter).toBe(5)
    expect(progress?.currentPosition).toBe(0)
  })

  it('should calculate progress percentage correctly', () => {
    useNovelStore.getState().updateReadingProgress('novel-1', 12, 0)
    const percentage = useNovelStore.getState().getProgressPercentage('novel-1')
    
    expect(percentage).toBe(50) // 12/24 = 0.5 = 50%
  })

  it('should cap progress at 100%', () => {
    useNovelStore.getState().updateReadingProgress('novel-1', 50, 0)
    const percentage = useNovelStore.getState().getProgressPercentage('novel-1')
    
    expect(percentage).toBeLessThanOrEqual(100)
  })

  it('should return 0% progress for novel with no progress', () => {
    const percentage = useNovelStore.getState().getProgressPercentage('novel-3')
    expect(percentage).toBe(0)
  })

  it('should update progress on multiple reads', () => {
    useNovelStore.getState().updateReadingProgress('novel-1', 5, 0)
    let progress = useNovelStore.getState().getReadingProgress('novel-1')
    expect(progress?.currentChapter).toBe(5)
    
    useNovelStore.getState().updateReadingProgress('novel-1', 15, 50)
    progress = useNovelStore.getState().getReadingProgress('novel-1')
    expect(progress?.currentChapter).toBe(15)
    expect(progress?.currentPosition).toBe(50)
  })
})

describe('Store - Bookshelf', () => {
  beforeEach(() => {
    useNovelStore.setState({
      novels: mockNovels,
      readingProgress: {},
      bookshelf: {},
      bookmarks: [],
      currentTheme: 'light',
      fontSize: 16
    })
  })

  it('should add a novel to bookshelf', () => {
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    
    expect(useNovelStore.getState().isInBookshelf('novel-1')).toBe(true)
    const items = useNovelStore.getState().getBookshelfItems()
    expect(items).toHaveLength(1)
    expect(items[0].novelId).toBe('novel-1')
    expect(items[0].status).toBe('reading')
  })

  it('should remove a novel from bookshelf', () => {
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    expect(useNovelStore.getState().isInBookshelf('novel-1')).toBe(true)
    
    useNovelStore.getState().removeFromBookshelf('novel-1')
    expect(useNovelStore.getState().isInBookshelf('novel-1')).toBe(false)
  })

  it('should handle multiple bookshelf items', () => {
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    useNovelStore.getState().addToBookshelf('novel-2', 'reading')
    useNovelStore.getState().addToBookshelf('novel-3', 'completed')
    
    const items = useNovelStore.getState().getBookshelfItems()
    expect(items).toHaveLength(3)
  })

  it('should update bookshelf item status', () => {
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    useNovelStore.getState().updateBookshelfStatus('novel-1', 'completed')
    
    const item = useNovelStore.getState().getBookshelfItems()[0]
    expect(item.status).toBe('completed')
  })

  it('should not add duplicate bookshelf items', () => {
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    useNovelStore.getState().addToBookshelf('novel-1', 'completed')
    
    const items = useNovelStore.getState().getBookshelfItems()
    expect(items).toHaveLength(1)
    expect(items[0].status).toBe('completed')
  })
})

describe('Store - Bookmarks', () => {
  beforeEach(() => {
    useNovelStore.setState({
      novels: mockNovels,
      readingProgress: {},
      bookshelf: {},
      bookmarks: [],
      currentTheme: 'light',
      fontSize: 16
    })
  })

  it('should add a bookmark', () => {
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Great quote')
    
    const bookmarks = useNovelStore.getState().getBookmarks('novel-1')
    expect(bookmarks).toHaveLength(1)
    expect(bookmarks[0].quote).toBe('Great quote')
    expect(bookmarks[0].chapterNumber).toBe(1)
  })

  it('should remove a bookmark', () => {
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Great quote')
    let bookmarks = useNovelStore.getState().getBookmarks('novel-1')
    expect(bookmarks).toHaveLength(1)
    
    const bookmarkId = bookmarks[0].id
    useNovelStore.getState().removeBookmark(bookmarkId)
    
    bookmarks = useNovelStore.getState().getBookmarks('novel-1')
    expect(bookmarks).toHaveLength(0)
  })

  it('should check if a bookmark exists', () => {
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Great quote')
    
    expect(useNovelStore.getState().isBookmarked('novel-1', 'ch-1', 0)).toBe(true)
    expect(useNovelStore.getState().isBookmarked('novel-1', 'ch-2', 0)).toBe(false)
  })

  it('should get bookmarks for a specific novel only', () => {
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Quote 1')
    useNovelStore.getState().addBookmark('novel-2', 'ch-1', 1, 0, 'Quote 2')
    
    const novel1Bookmarks = useNovelStore.getState().getBookmarks('novel-1')
    const novel2Bookmarks = useNovelStore.getState().getBookmarks('novel-2')
    
    expect(novel1Bookmarks).toHaveLength(1)
    expect(novel2Bookmarks).toHaveLength(1)
    expect(novel1Bookmarks[0].novelId).toBe('novel-1')
  })

  it('should update bookmark by replacing with same ID', () => {
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Original quote')
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Updated quote')
    
    const bookmarks = useNovelStore.getState().getBookmarks('novel-1')
    expect(bookmarks).toHaveLength(1)
    expect(bookmarks[0].quote).toBe('Updated quote')
  })
})

describe('Store - Theme and Settings', () => {
  beforeEach(() => {
    useNovelStore.setState({
      novels: mockNovels,
      readingProgress: {},
      bookshelf: {},
      bookmarks: [],
      currentTheme: 'light',
      fontSize: 16
    })
  })

  it('should toggle theme from light to dark', () => {
    expect(useNovelStore.getState().currentTheme).toBe('light')
    useNovelStore.getState().toggleTheme()
    expect(useNovelStore.getState().currentTheme).toBe('dark')
  })

  it('should toggle theme from dark to light', () => {
    useNovelStore.setState({ currentTheme: 'dark' })
    useNovelStore.getState().toggleTheme()
    expect(useNovelStore.getState().currentTheme).toBe('light')
  })

  it('should set font size within bounds', () => {
    useNovelStore.getState().setFontSize(20)
    expect(useNovelStore.getState().fontSize).toBe(20)
    
    useNovelStore.getState().setFontSize(10) // Below minimum
    expect(useNovelStore.getState().fontSize).toBe(12)
    
    useNovelStore.getState().setFontSize(30) // Above maximum
    expect(useNovelStore.getState().fontSize).toBe(28)
  })

  it('should increase font size', () => {
    useNovelStore.setState({ fontSize: 16 })
    useNovelStore.getState().increaseFontSize()
    expect(useNovelStore.getState().fontSize).toBe(18)
  })

  it('should not increase font size beyond maximum', () => {
    useNovelStore.setState({ fontSize: 28 })
    useNovelStore.getState().increaseFontSize()
    expect(useNovelStore.getState().fontSize).toBe(28)
  })

  it('should decrease font size', () => {
    useNovelStore.setState({ fontSize: 16 })
    useNovelStore.getState().decreaseFontSize()
    expect(useNovelStore.getState().fontSize).toBe(14)
  })

  it('should not decrease font size below minimum', () => {
    useNovelStore.setState({ fontSize: 12 })
    useNovelStore.getState().decreaseFontSize()
    expect(useNovelStore.getState().fontSize).toBe(12)
  })
})
