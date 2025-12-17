import { render, screen, fireEvent } from '@testing-library/react'
import { useStore } from './store'

describe('store', () => {
  beforeEach(() => {
    // reset store state by recreating store state
    const initial = useStore.getState()
    // recreate using create from zustand might not have reset; instead set all properties
    useStore.setState({
      currentNovelId: undefined,
      currentChapterId: undefined,
      readingProgress: {},
      bookmarks: {},
      bookshelf: new Set(),
      theme: 'light',
      fontSize: 16,
    })
  })

  test('toggleBookshelf adds and removes novel', () => {
    const state = useStore.getState()
    expect(state.bookshelf.size).toBe(0)
    state.toggleBookshelf('novel-1')
    expect(useStore.getState().bookshelf.has('novel-1')).toBe(true)
    state.toggleBookshelf('novel-1')
    expect(useStore.getState().bookshelf.has('novel-1')).toBe(false)
  })

  test('toggleBookmark adds and removes bookmark', () => {
    const s = useStore.getState()
    expect(s.bookmarks['novel-1']).toBeUndefined()
    s.toggleBookmark('novel-1', 'c1', 'excerpt')
    expect(useStore.getState().bookmarks['novel-1']).toHaveLength(1)
    s.toggleBookmark('novel-1', 'c1', 'excerpt')
    expect(useStore.getState().bookmarks['novel-1']).toBeUndefined()
  })

  test('setReadingProgress updates progress', () => {
    const s = useStore.getState()
    s.setReadingProgress('novel-1', { chapterId: 'c1', percent: 50 })
    expect(useStore.getState().readingProgress['novel-1']).toEqual({ chapterId: 'c1', percent: 50 })
  })

  test('setTheme and setFontSize update UI state', () => {
    const s = useStore.getState()
    s.setTheme('dark')
    s.setFontSize(20)
    expect(useStore.getState().theme).toBe('dark')
    expect(useStore.getState().fontSize).toBe(20)
  })
})
