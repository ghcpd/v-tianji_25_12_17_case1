import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import useStore from '../store/useStore'

beforeEach(() => localStorage.clear())

describe('HomePage', () => {
  it('adds novel to bookshelf when clicking button', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const btn = screen.getAllByText('Add to Bookshelf')[0]
    fireEvent.click(btn)
    expect(useStore.getState().bookshelf.length).toBeGreaterThan(0)
  })
})
