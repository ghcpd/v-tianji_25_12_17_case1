import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { AppProvider, useApp } from './state'

function wrapper(props) { return React.createElement(AppProvider, null, props.children) }

describe('App state logic', () => {
  beforeEach(() => { localStorage.clear() })

  it('adds and removes novels from bookshelf', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    act(() => { result.current.addToBookshelf('n-1') })
    expect(result.current.bookshelf).toContain('n-1')
    act(() => { result.current.removeFromBookshelf('n-1') })
    expect(result.current.bookshelf).not.toContain('n-1')
  })

  it('toggles bookmarks', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    act(() => { result.current.toggleBookmark('n-1', 'n1-c1') })
    expect(Object.keys(result.current.bookmarks).length).toBe(1)
    act(() => { result.current.toggleBookmark('n-1', 'n1-c1') })
    expect(Object.keys(result.current.bookmarks).length).toBe(0)
  })

  it('sets progress for a chapter', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    act(() => { result.current.setProgressFor('n-1', 'n1-c1', 42) })
    expect(result.current.progress['n-1']['n1-c1']).toBe(42)
  })

  it('persists theme and font size to localStorage', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    act(() => { result.current.setTheme('light') })
    act(() => { result.current.setFontSize(18) })
    expect(localStorage.getItem('theme')).toBe('light')
    expect(localStorage.getItem('fontSize')).toBe('18')
  })
})
