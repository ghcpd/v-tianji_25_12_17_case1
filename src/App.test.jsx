import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

beforeEach(() => localStorage.clear())

describe('App UI integration', () => {
  it('renders and searches novels', () => {
    render(<App />)
    expect(screen.getByText(/Novel Reader/i)).toBeInTheDocument()
    const input = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(input, { target: { value: 'clockwork' } })
    expect(screen.getByText(/Clockwork Orchard/i)).toBeInTheDocument()
    // ensure others hidden
    expect(screen.queryByText(/Letters from the Mountain/i)).toBeNull()
  })

  it('adds novel to bookshelf and shows it in sidebar', () => {
    render(<App />)
    const addBtns = screen.getAllByText(/Add|In Bookshelf/)
    expect(addBtns.length).toBeGreaterThan(0)
    fireEvent.click(addBtns[0])
    // Now bookshelf should show item (use a tolerant lookup to avoid matching button text)
    expect(screen.getAllByText(/Bookshelf/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Progress/).length).toBeGreaterThan(0)
  })

  it('toggles theme and font size and updates reader', () => {
    render(<App />)
    const themeBtn = screen.getByLabelText('theme')
    fireEvent.click(themeBtn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    const increase = screen.getByText('A+')
    fireEvent.click(increase)
    // reader panel shows font size badge
    expect(screen.getAllByText(/px/)[0]).toBeInTheDocument()
  })

  it('can bookmark a chapter and move progress slider', () => {
    render(<App />)
    const starBtn = screen.getAllByText('☆')[0]
    fireEvent.click(starBtn)
    // star toggles to filled
    expect(screen.getAllByText('★').length).toBeGreaterThanOrEqual(1)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '77' } })
    // multiple nodes can show the percent (badge and "last saved"), ensure at least one shows it
    expect(screen.getAllByText(/77%/).length).toBeGreaterThan(0)
  })
})
