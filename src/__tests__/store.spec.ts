import useStore from '../store/useStore'
import { act } from 'react-dom/test-utils'

beforeEach(() => {
  localStorage.clear()
})

describe('store', () => {
  it('adds and removes from bookshelf', () => {
    act(() => {
      useStore.getState().addToBookshelf('n1')
    })
    expect(useStore.getState().bookshelf).toContain('n1')

    act(() => {
      useStore.getState().removeFromBookshelf('n1')
    })
    expect(useStore.getState().bookshelf).not.toContain('n1')
  })

  it('sets theme and font size', () => {
    act(() => useStore.getState().setTheme('dark'))
    expect(useStore.getState().settings.theme).toBe('dark')
    act(() => useStore.getState().setFontSize(22))
    expect(useStore.getState().settings.fontSize).toBe(22)
  })

  it('bookmarks and sets progress', () => {
    act(() => useStore.getState().setBookmark('n1', 'c1', 100))
    expect(useStore.getState().bookmarks['n1:c1']).toBe(100)
    act(() => useStore.getState().setProgress('n1', 42))
    expect(useStore.getState().progress['n1']).toBe(42)
  })
})
