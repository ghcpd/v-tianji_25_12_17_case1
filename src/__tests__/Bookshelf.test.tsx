import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Bookshelf } from '../components/Bookshelf'
import { useNovelStore } from '../store'

describe('Bookshelf Component', () => {
  beforeEach(() => {
    useNovelStore.setState({
      readingProgress: {},
      bookshelf: {},
      bookmarks: []
    })
  })

  it('should display empty bookshelf message', () => {
    const mockOnSelect = vi.fn()
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('Your bookshelf is empty')).toBeTruthy()
  })

  it('should display novels in reading section', () => {
    const mockOnSelect = vi.fn()
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('The Echoing Corridors')).toBeTruthy()
    expect(screen.getByText(/Currently Reading/)).toBeTruthy()
  })

  it('should display novels in completed section', () => {
    const mockOnSelect = vi.fn()
    useNovelStore.getState().addToBookshelf('novel-2', 'completed')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('Starlight Chronicles')).toBeTruthy()
    expect(screen.getByRole('heading', { name: /Completed \(1\)/ })).toBeTruthy()
  })

  it('should display novels in dropped section', () => {
    const mockOnSelect = vi.fn()
    useNovelStore.getState().addToBookshelf('novel-3', 'dropped')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('The Silent Garden')).toBeTruthy()
    expect(screen.getByRole('heading', { name: /Dropped \(1\)/ })).toBeTruthy()
  })

  it('should remove novel from bookshelf', async () => {
    const mockOnSelect = vi.fn()
    const user = userEvent.setup()
    
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    
    const { rerender } = render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    const removeBtn = screen.getByText('Remove')
    await user.click(removeBtn)
    
    rerender(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('Your bookshelf is empty')).toBeTruthy()
  })

  it('should change novel status', async () => {
    const mockOnSelect = vi.fn()
    const user = userEvent.setup()
    
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    const select = screen.getByRole('combobox') as HTMLSelectElement
    await user.selectOptions(select, 'completed')
    
    const item = useNovelStore.getState().getBookshelfItems()[0]
    expect(item.status).toBe('completed')
  })

  it('should call onSelectNovel when read button is clicked', async () => {
    const mockOnSelect = vi.fn()
    const user = userEvent.setup()
    
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    const readBtn = screen.getByText('Read')
    await user.click(readBtn)
    
    expect(mockOnSelect).toHaveBeenCalledWith('novel-1')
  })

  it('should display reading progress', () => {
    const mockOnSelect = vi.fn()
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    useNovelStore.getState().updateReadingProgress('novel-1', 12, 0)
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('50%')).toBeTruthy()
  })

  it('should organize novels by status', () => {
    const mockOnSelect = vi.fn()
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    useNovelStore.getState().addToBookshelf('novel-2', 'completed')
    useNovelStore.getState().addToBookshelf('novel-3', 'dropped')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText(/Currently Reading \(1\)/)).toBeTruthy()
    expect(screen.getByText(/Completed \(1\)/)).toBeTruthy()
    expect(screen.getByText(/Dropped \(1\)/)).toBeTruthy()
  })

  it('should display novel author', () => {
    const mockOnSelect = vi.fn()
    useNovelStore.getState().addToBookshelf('novel-1', 'reading')
    
    render(<Bookshelf onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
  })
})
