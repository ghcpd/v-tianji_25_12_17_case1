Novel Reader - Test and Dev Logs

Commands executed:
- npm install
- npm run test
- npm run dev
- npx vite build

Test run (npm run test) summary:
- All tests passed (6 tests across 3 files). Vitest output indicated 6 passed.
- Relevant output excerpt:

 RUN  v1.6.1 C:/Users/v-tianji/Desktop/ghcpd/330
 ✓ src/__tests__/store.spec.ts (3)
 ✓ src/__tests__/home.spec.tsx (1)
 ✓ src/__tests__/reader.spec.tsx (2)

 Dev server (npm run dev) summary:
- Vite started and reported local URL:
  VITE v5.4.21  ready in 1187 ms
  ➜  Local:   http://localhost:5173/

 Build summary (npx vite build):
- Production build completed successfully; dist files generated.

Notes:
- The app uses in-memory mock data and persisting state to localStorage via Zustand's persist middleware.
- All unit tests exercise core UI logic and state interactions (bookshelf, bookmarks, settings, progress).
