# Setup & Execution Commands

## Complete Project Setup History

### Step 1: Install Dependencies
**Command:**
```bash
npm install
```

**Output:**
```
added 300 packages, and audited 301 packages in 52s
86 packages are looking for funding
```

**What it does:**
- Installs all dependencies from `package.json`
- Creates `node_modules/` directory
- Generates `package-lock.json` for version locking

---

## Step 2: Run All Tests

### Full Test Execution
**Command:**
```bash
npm test -- --run
```

**Output:**
```
RUN  v1.6.1 C:/Users/v-tianji/Desktop/ghcpd/Claude-haiku-4.5

✓ src/__tests__/store.test.ts (29 tests) 44ms
✓ src/__tests__/NovelBrowser.test.tsx (6 tests) 726ms
✓ src/__tests__/Reader.test.tsx (11 tests) 1110ms
✓ src/__tests__/Settings.test.tsx (13 tests) 1004ms
✓ src/__tests__/Bookshelf.test.tsx (10 tests) 1143ms

Test Files  5 passed (5)
     Tests  69 passed (69)
   Start at  10:32:18
   Duration  7.01s (transform 1.41s, setup 2ms, collect 11.45s, tests 4.03s, environment 11.40s, prepare 2.02s)
```

**Test Coverage Breakdown:**
- **store.test.ts** (29 tests)
  - Novel retrieval tests
  - Chapter management tests
  - Reading progress tests
  - Bookshelf management tests
  - Bookmark CRUD tests
  - Theme and settings tests

- **NovelBrowser.test.tsx** (6 tests)
  - Novel grid rendering
  - Metadata display
  - Genre display
  - Selection interaction
  - Integration tests

- **Reader.test.tsx** (11 tests)
  - Display tests
  - Navigation tests
  - Progress tracking
  - Bookmark functionality
  - Chapter selection

- **Bookshelf.test.tsx** (10 tests)
  - Empty state display
  - Novel organization
  - Status management
  - Progress display
  - CRUD operations

- **Settings.test.tsx** (13 tests)
  - Theme toggling
  - Font size controls
  - Settings display
  - Information display

### Alternative Test Commands

**Watch Mode (auto-rerun on changes):**
```bash
npm test
```

**With UI Dashboard:**
```bash
npm test:ui
```

**Coverage Report:**
```bash
npm test:coverage
```

**Specific Test File:**
```bash
npm test -- src/__tests__/store.test.ts --run
```

---

## Step 3: Start Development Server

**Command:**
```bash
npm run dev
```

**Output:**
```
  VITE v5.4.21  ready in 2558 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.10.0.115:5173/
  ➜  Network: http://172.16.65.139:5173/
  ➜  Network: http://172.27.176.1:5173/
  ➜  press h + enter to show help
```

**What it does:**
- Starts Vite dev server on port 5173
- Enables Hot Module Replacement (HMR)
- Watches for file changes
- Auto-refreshes browser on changes

**Accessing the App:**
- **Local**: http://localhost:5173/
- **Network**: http://10.10.0.115:5173/ (or other network address)

**Server Commands (once running):**
- Press `h + enter` - Show help
- Press `q` - Quit server
- Press `r` - Restart server

---

## Step 4: Build for Production

**Command:**
```bash
npm run build
```

**What it does:**
- Compiles TypeScript → JavaScript
- Bundles all assets
- Optimizes for production
- Generates `dist/` folder

**Output Directory:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
```

---

## Step 5: Preview Production Build

**Command:**
```bash
npm run preview
```

**What it does:**
- Starts local preview server
- Tests production build locally
- Shows performance metrics

---

## All Available NPM Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
}
```

### Quick Reference
```bash
npm run dev              # Start dev server (http://localhost:5173/)
npm run build            # Build for production
npm run preview          # Preview production build
npm test                 # Run tests in watch mode
npm test -- --run        # Run tests once
npm test:ui              # Test dashboard UI
npm test:coverage        # Generate coverage report
```

---

## Development Workflow

### Typical Developer Session

```bash
# 1. Start development server
npm run dev
# App runs on http://localhost:5173/

# 2. In another terminal, start tests
npm test
# Tests watch for changes

# 3. Edit files in src/
# - Code changes auto-reload
# - Tests auto-run
# - TypeScript checks in real-time

# 4. When ready, build for production
npm run build

# 5. Preview the build
npm run preview

# 6. Stop servers with Ctrl+C
```

---

## Testing Commands Explained

### Full Test Suite
```bash
npm test -- --run
```
- Runs all 69 tests
- Reports pass/fail
- Shows timing
- Exits with code 0 (success) or 1 (failure)

### Watch Mode
```bash
npm test
```
- Runs tests continuously
- Re-runs on file changes
- Useful during development
- Press `q` to quit

### UI Dashboard
```bash
npm test:ui
```
- Opens browser-based test UI
- Visual test runner
- Real-time results
- Better for debugging

### Coverage Report
```bash
npm test:coverage
```
- Shows code coverage
- Line coverage
- Branch coverage
- Function coverage

### Single Test File
```bash
npm test -- src/__tests__/store.test.ts --run
```
- Runs only specific test file
- Useful for focused testing

### Single Test Case
```bash
npm test -- --run -t "should display novel title"
```
- Runs only matching test
- Pattern-based filtering

---

## Troubleshooting Commands

### Clear Dependencies Cache
```bash
rm -rf node_modules
npm install
```

### Clear npm Cache
```bash
npm cache clean --force
npm install
```

### Restart Dev Server
```bash
# Stop with Ctrl+C
# Then restart
npm run dev
```

### Check for Issues
```bash
# Run TypeScript compiler
npx tsc --noEmit

# Run tests with verbose output
npm test -- --run --reporter=verbose
```

---

## Production Deployment Commands

```bash
# 1. Build
npm run build

# 2. Preview build locally
npm run preview

# 3. Deploy dist/ folder to hosting
# (GitHub Pages, Netlify, Vercel, etc.)
```

---

## Environment Variables

Currently, the app uses no environment variables. To add them:

1. Create `.env` file in project root
2. Add variables: `VITE_API_URL=https://api.example.com`
3. Access in code: `import.meta.env.VITE_API_URL`

---

## Performance Optimization Commands

### Analyze Bundle Size
```bash
npm run build
# Check dist/ folder size
ls -lah dist/
```

### Profile Build Time
```bash
npm run build -- --profile
```

### Update Dependencies
```bash
npm update
npm audit
npm audit fix
```

---

## Useful Development Tips

### Kill Process on Port
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Mac/Linux
lsof -i :5173
kill -9 [PID]
```

### Run Tests with Debugging
```bash
node --inspect-brk ./node_modules/.bin/vitest run
```

### TypeScript Type Check
```bash
npx tsc --noEmit
```

---

## Summary

| Command | Purpose | When to Use |
|---------|---------|-----------|
| `npm install` | Install deps | First time setup |
| `npm test -- --run` | Run all tests | CI/CD, pre-commit |
| `npm test` | Watch tests | Development |
| `npm run dev` | Start dev server | Daily development |
| `npm run build` | Build production | Before deployment |
| `npm run preview` | Test build | Verify before deploy |

---

## Success Indicators

✅ **npm install**
- All 300 packages installed
- No errors

✅ **npm test -- --run**
- All 69 tests pass
- Duration ~7 seconds

✅ **npm run dev**
- Server starts on port 5173
- App accessible in browser
- Files have HMR

✅ **npm run build**
- Build completes without errors
- dist/ folder created with files

---

**Created**: December 17, 2025
