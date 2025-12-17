import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header.tsx';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Browse')).toBeInTheDocument();
    expect(screen.getByText('Bookshelf')).toBeInTheDocument();
    expect(screen.getByText('Bookmarks')).toBeInTheDocument();
  });

  it('highlights active link', () => {
    renderWithRouter(<Header />);
    
    // Assuming current path is /, Browse should be underlined
    const browseLink = screen.getByText('Browse');
    expect(browseLink).toHaveStyle('text-decoration: underline');
  });
});