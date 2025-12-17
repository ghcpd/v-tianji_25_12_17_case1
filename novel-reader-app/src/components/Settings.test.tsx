import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/AppContext';

test('opens settings and changes theme/font size', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  const settingsButton = screen.getByText(/Settings/);
  fireEvent.click(settingsButton);

  expect(screen.getByRole('heading', { level: 2, name: /Settings/ })).toBeInTheDocument();

  // Switch to dark theme
  const darkButton = screen.getByText(/Dark/);
  fireEvent.click(darkButton);
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

  // Font size 20
  const sizeButton = screen.getByText('20px');
  fireEvent.click(sizeButton);

  // Check preview changed font size by verifying style attribute
  const preview = screen.getByText(/The quick brown fox/);
  expect(preview).toHaveStyle({ fontSize: '20px' });
});