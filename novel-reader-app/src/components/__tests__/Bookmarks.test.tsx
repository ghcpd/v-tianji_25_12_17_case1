import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Bookmarks from '../Bookmarks';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProvider>{component}</AppProvider>
    </BrowserRouter>
  );
};

describe('Bookmarks', () => {
  test('renders empty bookmarks', () => {
    renderWithProviders(<Bookmarks />);
    expect(screen.getByText('My Bookmarks')).toBeInTheDocument();
    expect(screen.getByText('No bookmarks yet.')).toBeInTheDocument();
  });
});