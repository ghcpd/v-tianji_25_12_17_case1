import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { NovelBrowser } from './NovelBrowser';

test('renders browser and searches novels', () => {
  render(
    <AppProvider>
      <NovelBrowser onNovelSelect={() => {}} />
    </AppProvider>
  );

  expect(screen.getByPlaceholderText('Search novels...')).toBeInTheDocument();
  expect(screen.getByText('Novel Library')).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText('Search novels...');
  fireEvent.change(searchInput, { target: { value: 'Digital' } });
  expect(screen.getByText('Digital Dreams')).toBeInTheDocument();
});
