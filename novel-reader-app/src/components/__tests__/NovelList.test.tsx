import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import NovelList from '../NovelList';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProvider>{component}</AppProvider>
    </BrowserRouter>
  );
};

describe('NovelList', () => {
  test('renders list of novels', () => {
    renderWithProviders(<NovelList />);
    expect(screen.getByText('Browse Novels')).toBeInTheDocument();
    expect(screen.getByText('The Great Adventure')).toBeInTheDocument();
    expect(screen.getByText('Mystery of the Old Manor')).toBeInTheDocument();
  });

  test('adds novel to bookshelf', () => {
    renderWithProviders(<NovelList />);
    const addButton = screen.getAllByText('Add to Bookshelf')[0];
    fireEvent.click(addButton);
    expect(screen.getByText('Remove from Bookshelf')).toBeInTheDocument();
  });
});