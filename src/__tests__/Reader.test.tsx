import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Reader } from '../components/Reader'
import { useNovelStore } from '../store'

describe('Reader Component', () => {
  beforeEach(() => {
    useNovelStore.setState({
      readingProgress: {},
      bookshelf: {},
      bookmarks: [],
      fontSize: 16
    })
  })

  it('should display novel title', () => {
    const mockOnClose = vi.fn()
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    expect(screen.getByText('The Echoing Corridors')).toBeTruthy()
  })

  it('should display chapter content', () => {
    const mockOnClose = vi.fn()
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    expect(screen.getByText('The Beginning - Part 1')).toBeTruthy()
  })

  it('should show chapter navigation', () => {
    const mockOnClose = vi.fn()
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    expect(screen.getByText('← Previous')).toBeTruthy()
    expect(screen.getByText('Next →')).toBeTruthy()
  })

  it('should display progress bar', () => {
    const mockOnClose = vi.fn()
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    const progressText = screen.getByText(/complete/i)
    expect(progressText).toBeTruthy()
  })

  it('should navigate to next chapter', async () => {
    const mockOnClose = vi.fn()
    const user = userEvent.setup()
    
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('1')
    
    const nextBtn = screen.getByText('Next →')
    await user.click(nextBtn)
    
    expect(select.value).toBe('2')
  })

  it('should disable previous button at first chapter', () => {
    const mockOnClose = vi.fn()
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    const prevBtn = screen.getByText('← Previous') as HTMLButtonElement
    expect(prevBtn.disabled).toBe(true)
  })

  it('should change chapter via select dropdown', async () => {
    const mockOnClose = vi.fn()
    const user = userEvent.setup()
    
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    const select = screen.getByRole('combobox') as HTMLSelectElement
    await user.selectOptions(select, '5')
    
    expect(select.value).toBe('5')
  })

  it('should bookmark a chapter', async () => {
    const mockOnClose = vi.fn()
    const user = userEvent.setup()
    
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    const bookmarkBtn = screen.getByText('🔖 Bookmark Chapter')
    await user.click(bookmarkBtn)
    
    expect(screen.getByText('🔖 Bookmarked')).toBeTruthy()
  })

  it('should show bookmarks list', () => {
    const mockOnClose = vi.fn()
    useNovelStore.getState().addBookmark('novel-1', 'ch-1', 1, 0, 'Important quote')
    
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    expect(screen.getByText(/Important quote/)).toBeTruthy()
    expect(screen.getByText(/Ch\. 1/)).toBeTruthy()
  })

  it('should close reader', async () => {
    const mockOnClose = vi.fn()
    const user = userEvent.setup()
    
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    const closeBtn = screen.getByText('✕')
    await user.click(closeBtn)
    
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('should display reading progress percentage', () => {
    const mockOnClose = vi.fn()
    useNovelStore.getState().updateReadingProgress('novel-1', 12, 0)
    
    render(<Reader novelId="novel-1" onClose={mockOnClose} />)
    
    // 12 / 24 = 50%
    expect(screen.getByText(/50% complete/)).toBeTruthy()
  })
})
