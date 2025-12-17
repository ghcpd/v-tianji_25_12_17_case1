import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { Reader } from './Reader';

test('adds a bookmark and navigates to it', async () => {
  render(
    <AppProvider>
      <Reader novelId="1" onClose={() => {}} />
    </AppProvider>
  );

  // Open bookmarks panel
  const bookmarksButton = screen.getByText(/Bookmarks \(0\)/);
  fireEvent.click(bookmarksButton);

  // Add a bookmark
  const input = screen.getByPlaceholderText('Add a note...');
  fireEvent.change(input, { target: { value: 'Important passage' } });

  const addButton = screen.getByText('Add Bookmark');
  fireEvent.click(addButton);

  // Now the bookmark should appear
  expect(await screen.findByText(/Important passage/)).toBeInTheDocument();

  const goButton = screen.getByText('Go');
  fireEvent.click(goButton);

  // After navigation, the bookmark panel should be closed
  expect(screen.queryByText(/Important passage/)).not.toBeInTheDocument();
});