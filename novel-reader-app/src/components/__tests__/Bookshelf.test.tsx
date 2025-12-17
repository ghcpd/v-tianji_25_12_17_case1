import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Bookshelf from '../Bookshelf';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProvider>{component}</AppProvider>
    </BrowserRouter>
  );
};

describe('Bookshelf', () => {
  test('renders empty bookshelf', () => {
    renderWithProviders(<Bookshelf />);
    expect(screen.getByText('My Bookshelf')).toBeInTheDocument();
    expect(screen.getByText('No novels in your bookshelf yet.')).toBeInTheDocument();
  });
});