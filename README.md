# Novel Reading Web App

A modern, fully functional web application for reading novels with advanced features like progress tracking, bookmarking, and personalization.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run tests
npm test -- --run

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## Features

### 📚 Novel Browser
- Browse 5 sample novels with metadata
- View novel covers, titles, authors, ratings
- Browse genres and chapter counts
- Click to start reading any novel

### 📖 Reading Interface
- Chapter-by-chapter reading
- Previous/Next navigation
- Direct chapter selection via dropdown
- Real-time progress tracking
- Adjustable font size (12-28px)
- Responsive layout

### 🔖 Bookmarking
- Bookmark favorite chapters
- Store quotes with bookmarks
- View all bookmarks per novel
- One-click bookmark removal

### 📊 Progress Tracking
- Automatic progress updates
- Visual progress bar
- Percentage completion display
- Persistent progress data

### 📚 Personal Bookshelf
- Add/remove novels
- Organize by status (Reading/Completed/Dropped)
- View progress at a glance
- Quick access to any novel

### 🎨 Customization
- Light/Dark theme toggle
- Font size adjustment
- Real-time theme switching
- Smooth transitions

### ⚙️ Settings
- Theme management
- Font size controls with preview
- Application information
- Feature overview

## Project Structure

```
src/
├── components/          # React components
│   ├── NovelBrowser    # Novel browsing interface
│   ├── Reader          # Reading interface
│   ├── Bookshelf       # Library management
│   └── Settings        # Settings panel
├── __tests__/          # Unit tests (69 tests)
├── store.ts            # State management (Zustand)
├── types.ts            # TypeScript definitions
├── mockData.ts         # Sample data
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Available Scripts

```bash
# Development server
npm run dev

# Run tests (watch mode)
npm test

# Run tests once
npm test -- --run

# Test with UI
npm test:ui

# Coverage report
npm test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **CSS Modules** - Scoped styling

## Test Coverage

✅ **69 tests passing**
- Store management (29 tests)
- NovelBrowser component (6 tests)
- Reader component (11 tests)
- Bookshelf component (10 tests)
- Settings component (13 tests)

### Running Tests

```bash
# All tests in watch mode
npm test

# Run once and exit
npm test -- --run

# With UI dashboard
npm test:ui

# With coverage
npm test:coverage
```

## State Management

### Zustand Store Features
- Novel data retrieval
- Chapter management
- Reading progress tracking
- Bookmark management
- Bookshelf organization
- Theme and font settings
- All state in single source of truth

### Key Actions
- `getNovels()` - Get all novels
- `getChapter(novelId, chapterNumber)` - Get specific chapter
- `updateReadingProgress()` - Track reading position
- `addBookmark()` - Save bookmarks
- `addToBookshelf()` - Add novel to library
- `toggleTheme()` - Switch light/dark mode
- `setFontSize()` - Adjust text size

## Mock Data

The application includes 5 sample novels:

1. **The Echoing Corridors** by Sarah Mitchell (24 chapters)
   - Mystery, Fantasy, Adventure

2. **Starlight Chronicles** by James Chen (32 chapters)
   - Science Fiction, Adventure, Action

3. **The Silent Garden** by Emma Roberts (18 chapters)
   - Romance, Drama, Literary

4. **Crimson Tides** by Marcus Williams (28 chapters)
   - Adventure, Action, Historical

5. **The Fractured Mirror** by Lisa Zhang (22 chapters)
   - Thriller, Mystery, Psychological

## Styling

### Theme System
CSS variables control the entire theme:
```css
--bg: background color
--text: text color
--primary: primary button color
--secondary: secondary button color
-- progress-bg: progress bar background
```

### Light Theme (Default)
- White background
- Dark text
- Blue accents
- High contrast

### Dark Theme
- Dark background
- Light text
- Muted colors
- Comfortable for reading

## Component API

### NovelBrowser
```tsx
<NovelBrowser 
  onSelectNovel={(novelId) => {}}
  selectedNovelId="novel-1"
/>
```

### Reader
```tsx
<Reader 
  novelId="novel-1"
  onClose={() => {}}
/>
```

### Bookshelf
```tsx
<Bookshelf 
  onSelectNovel={(novelId) => {}}
/>
```

### Settings
```tsx
<Settings />
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Vite HMR for instant updates
- React optimization with hooks
- Zustand efficient state updates
- CSS Module isolation
- Minimal bundle size

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast ratios
- Clear visual hierarchy

## Development Workflow

1. **Code changes** → Vite HMR reloads instantly
2. **Tests update** → Vitest watches for changes
3. **Error checking** → TypeScript provides real-time feedback
4. **Build verification** → Run tests before production

## Production Build

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

Output: `dist/` directory ready for deployment

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Tests Not Running
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test -- --run
```

### Theme Not Changing
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser DevTools console

## Future Improvements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Cloud synchronization
- [ ] Custom novel uploads
- [ ] Advanced search/filters
- [ ] Reading statistics
- [ ] Export bookmarks
- [ ] Social features
- [ ] Offline reading
- [ ] e-book format support

## Contributing

Contributions welcome! Please ensure:
- All tests pass
- No TypeScript errors
- New features have tests
- Code follows project style

## License

MIT

## Support

For issues or questions, please refer to the test files for usage examples.

---

**Built with ❤️ using React, TypeScript, and Vite**
