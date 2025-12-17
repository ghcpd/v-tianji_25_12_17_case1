import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';


function wrapper({ children }: any) {
  return <AppProvider>{children}</AppProvider>;
}

test('bookshelf add/remove and preferences update', () => {
  const { result } = renderHook(() => useApp(), { wrapper });

  act(() => {
    result.current.addToBookshelf('1');
  });

  expect(result.current.isInBookshelf('1')).toBe(true);

  act(() => {
    result.current.removeFromBookshelf('1');
  });

  expect(result.current.isInBookshelf('1')).toBe(false);

  act(() => {
    result.current.updatePreferences({ fontSize: 20 });
  });

  expect(result.current.preferences.fontSize).toBe(20);
});
