import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NovelBrowser } from '../components/NovelBrowser'
import { useNovelStore } from '../store'
import { mockNovels } from '../mockData'

describe('NovelBrowser Component', () => {
  it('should render novels grid', () => {
    const mockOnSelect = vi.fn()
    render(<NovelBrowser onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('The Echoing Corridors')).toBeTruthy()
    expect(screen.getByText('Starlight Chronicles')).toBeTruthy()
    expect(screen.getByText('The Silent Garden')).toBeTruthy()
  })

  it('should display correct novel metadata', () => {
    const mockOnSelect = vi.fn()
    render(<NovelBrowser onSelectNovel={mockOnSelect} />)
    
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('James Chen')).toBeTruthy()
    expect(screen.getByText('24 chapters')).toBeTruthy()
    expect(screen.getByText('32 chapters')).toBeTruthy()
  })

  it('should display genres', () => {
    const mockOnSelect = vi.fn()
    render(<NovelBrowser onSelectNovel={mockOnSelect} />)
    
    expect(screen.getAllByText('Mystery')).toBeTruthy()
    expect(screen.getAllByText('Fantasy')).toBeTruthy()
    expect(screen.getAllByText('Science Fiction')).toBeTruthy()
  })

  it('should call onSelectNovel when clicking a novel', async () => {
    const mockOnSelect = vi.fn()
    const user = userEvent.setup()
    
    render(<NovelBrowser onSelectNovel={mockOnSelect} />)
    
    const novelCard = screen.getByText('The Echoing Corridors')
    await user.click(novelCard)
    
    expect(mockOnSelect).toHaveBeenCalledWith('novel-1')
  })

  it('should display all 5 novels', () => {
    const mockOnSelect = vi.fn()
    render(<NovelBrowser onSelectNovel={mockOnSelect} />)
    
    mockNovels.forEach(novel => {
      expect(screen.getByText(novel.title)).toBeTruthy()
      expect(screen.getByText(novel.author)).toBeTruthy()
    })
  })
})

describe('NovelBrowser Integration', () => {
  it('should access novels from store', () => {
    const novels = useNovelStore.getState().getNovels()
    
    expect(novels).toHaveLength(5)
    expect(novels.every(n => n.id && n.title && n.author)).toBe(true)
  })
})
