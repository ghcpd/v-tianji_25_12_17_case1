import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { Reader } from './Reader';

// This test renders the Reader for novel 1 and checks navigation
test('renders reader and navigates chapters', async () => {
  render(
    <AppProvider>
      <Reader novelId="1" onClose={() => {}} />
    </AppProvider>
  );

  expect(screen.getByRole('heading', { level: 2, name: /The Chronicles of Eternity/ })).toBeInTheDocument();
  expect(screen.getByText(/Chapter 1 of 45/)).toBeInTheDocument();

  const nextButton = screen.getByText(/Next Chapter/);
  fireEvent.click(nextButton);

  expect(await screen.findByText(/Chapter 2 of 45/)).toBeInTheDocument();
});
