import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AppProvider } from '../../context/AppContext';
import Reader from '../Reader';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProvider>{component}</AppProvider>
    </BrowserRouter>
  );
};

// Mock useParams
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ novelId: '1', chapterId: '1-1' }),
  };
});

describe('Reader', () => {
  test('renders chapter content', () => {
    renderWithProviders(<Reader />);
    expect(screen.getByText('The Great Adventure - Chapter 1: The Beginning')).toBeInTheDocument();
    expect(screen.getByText(/Once upon a time/)).toBeInTheDocument();
  });

  test('toggles theme', () => {
    renderWithProviders(<Reader />);
    const themeButton = screen.getByText('Dark');
    fireEvent.click(themeButton);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  test('adjusts font size', () => {
    renderWithProviders(<Reader />);
    expect(screen.getByText('Font: 16px')).toBeInTheDocument();
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    expect(screen.getByText('Font: 18px')).toBeInTheDocument();
  });
});