import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { NovelCard } from './NovelCard';
import { mockNovels } from '../data/mockData';

test('toggles bookshelf from novel card', () => {
  const novel = mockNovels[0];
  const onSelect = vi.fn();

  render(
    <AppProvider>
      <NovelCard novel={novel} onSelect={onSelect} />
    </AppProvider>
  );

  const button = screen.getByRole('button', { name: /Add to bookshelf|Remove from bookshelf/ });
  expect(button).toBeInTheDocument();

  // Add to bookshelf
  fireEvent.click(button);
  expect(screen.getByRole('button', { name: /Remove from bookshelf/ })).toBeInTheDocument();

  // Remove from bookshelf
  const removeButton = screen.getByRole('button', { name: /Remove from bookshelf/ });
  fireEvent.click(removeButton);
  expect(screen.getByRole('button', { name: /Add to bookshelf/ })).toBeInTheDocument();
});