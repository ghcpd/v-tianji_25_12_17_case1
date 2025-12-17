import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Reader from './Reader'

it('renders reader and allows next chapter', () => {
  render(
    <MemoryRouter initialEntries={['/reader/novel-1/c1']}>
      <Routes>
        <Route path='/reader/:novelId/:chapterId' element={<Reader />} />
      </Routes>
    </MemoryRouter>
  )

  // Check the heading that includes novel title and chapter
  expect(screen.getByRole('heading', { name: /The Great Adventure — Chapter 1/i })).toBeInTheDocument()

  const next = screen.getByText('Next')
  fireEvent.click(next)
  // after clicking next we should see Chapter 2 title
  expect(screen.getByRole('heading', { name: /The Great Adventure — Chapter 2/i })).toBeInTheDocument()
})
