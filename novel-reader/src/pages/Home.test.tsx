import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

it('renders novel list and bookshelf buttons', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )

  // should show the library title
  expect(screen.getByText(/Novel Library/i)).toBeInTheDocument()

  // at least one novel
  expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0)

  // buttons to add/remove bookshelf
  const buttons = screen.getAllByRole('button')
  expect(buttons.length).toBeGreaterThan(0)
})
