import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ReaderPage from '../pages/ReaderPage'
import useStore from '../store/useStore'

beforeEach(() => localStorage.clear())

describe('ReaderPage', () => {
  it('renders chapter and allows font size and bookmark', () => {
    render(
      <MemoryRouter initialEntries={["/novel/n1/chapter/c1"]}>
        <Routes>
          <Route path="/novel/:id/chapter/:chapterId" element={<ReaderPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/Prologue|Chapter 1|Nightfall/)).toBeInTheDocument()

    const content = screen.getByText(/Lorem ipsum/)
    expect(content).toBeInTheDocument()

    const initial = useStore.getState().settings.fontSize
    const btn = screen.getByText('A+')
    fireEvent.click(btn)
    expect(useStore.getState().settings.fontSize).toBeGreaterThanOrEqual(initial + 2)

    const bookmarkBtn = screen.getByLabelText('bookmark')
    fireEvent.click(bookmarkBtn)
    expect(useStore.getState().bookmarks['n1:c1']).toBeDefined()
  })

  it('updates position and progress', () => {
    render(
      <MemoryRouter initialEntries={["/novel/n1/chapter/c1"]}>
        <Routes>
          <Route path="/novel/:id/chapter/:chapterId" element={<ReaderPage />} />
        </Routes>
      </MemoryRouter>
    )
    const range = screen.getByLabelText('position') as HTMLInputElement
    fireEvent.change(range, { target: { value: '50' } })
    // progress should be set for novel n1
    expect(useStore.getState().progress['n1']).toBeGreaterThanOrEqual(0)
  })
})
