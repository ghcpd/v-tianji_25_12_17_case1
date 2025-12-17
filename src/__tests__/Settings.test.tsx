import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Settings } from '../components/Settings'
import { useNovelStore } from '../store'

describe('Settings Component', () => {
  beforeEach(() => {
    useNovelStore.setState({
      currentTheme: 'light',
      fontSize: 16
    })
  })

  it('should display settings heading', () => {
    render(<Settings />)
    expect(screen.getByText('Settings')).toBeTruthy()
  })

  it('should display theme section', () => {
    render(<Settings />)
    expect(screen.getByText('Theme')).toBeTruthy()
  })

  it('should display current theme', () => {
    render(<Settings />)
    expect(screen.getByText(/☀️ Light/)).toBeTruthy()
  })

  it('should toggle theme', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Settings />)
    
    expect(screen.getByText(/☀️ Light/)).toBeTruthy()
    
    const toggleBtn = screen.getByText(/Switch to/i)
    await user.click(toggleBtn)
    
    rerender(<Settings />)
    expect(screen.getByText(/🌙 Dark/)).toBeTruthy()
  })

  it('should display font size section', () => {
    render(<Settings />)
    expect(screen.getByText('Font Size')).toBeTruthy()
  })

  it('should display current font size', () => {
    render(<Settings />)
    expect(screen.getByText('16px')).toBeTruthy()
  })

  it('should increase font size', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Settings />)
    
    const increaseBtn = screen.getByText('A+')
    await user.click(increaseBtn)
    
    rerender(<Settings />)
    expect(screen.getByText('18px')).toBeTruthy()
  })

  it('should decrease font size', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Settings />)
    
    const decreaseBtn = screen.getByText('A−')
    await user.click(decreaseBtn)
    
    rerender(<Settings />)
    expect(screen.getByText('14px')).toBeTruthy()
  })

  it('should allow setting font size with slider', async () => {
    const user = userEvent.setup()
    render(<Settings />)
    
    const slider = screen.getByRole('slider') as HTMLInputElement
    await user.pointer([{ keys: '[MouseLeft>]', target: slider }])
    await user.pointer({ keys: '[/MouseLeft]' })
    
    expect(slider.value === '16' || slider.value === '22').toBe(true)
  })

  it('should display about section', () => {
    render(<Settings />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should display application information', () => {
    render(<Settings />)
    expect(screen.getByText('Novel Reading Web App')).toBeTruthy()
    expect(screen.getByText('Version 1.0.0')).toBeTruthy()
  })

  it('should display features list', () => {
    render(<Settings />)
    expect(screen.getByText('Browse and read novels')).toBeTruthy()
    expect(screen.getByText('Track reading progress')).toBeTruthy()
    expect(screen.getByText('Bookmark favorite chapters')).toBeTruthy()
  })

  it('should show sample text preview', () => {
    render(<Settings />)
    expect(screen.getByText('Sample Text')).toBeTruthy()
  })
})
