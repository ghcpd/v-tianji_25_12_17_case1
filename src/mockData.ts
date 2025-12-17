import { Novel, Chapter } from './types'

export const mockNovels: Novel[] = [
  {
    id: 'novel-1',
    title: 'The Echoing Corridors',
    author: 'Sarah Mitchell',
    cover: '📚',
    description: 'A mesmerizing tale of mystery and discovery as protagonists navigate a labyrinthine mansion filled with secrets.',
    totalChapters: 24,
    rating: 4.8,
    genre: ['Mystery', 'Fantasy', 'Adventure']
  },
  {
    id: 'novel-2',
    title: 'Starlight Chronicles',
    author: 'James Chen',
    cover: '⭐',
    description: 'An epic space opera spanning galaxies where humanity must unite against cosmic threats.',
    totalChapters: 32,
    rating: 4.6,
    genre: ['Science Fiction', 'Adventure', 'Action']
  },
  {
    id: 'novel-3',
    title: 'The Silent Garden',
    author: 'Emma Roberts',
    cover: '🌿',
    description: 'A poignant coming-of-age story set in a secluded garden sanctuary where secrets bloom.',
    totalChapters: 18,
    rating: 4.9,
    genre: ['Romance', 'Drama', 'Literary']
  },
  {
    id: 'novel-4',
    title: 'Crimson Tides',
    author: 'Marcus Williams',
    cover: '🌊',
    description: 'A thrilling nautical adventure with pirates, treasures, and unexpected alliances.',
    totalChapters: 28,
    rating: 4.5,
    genre: ['Adventure', 'Action', 'Historical']
  },
  {
    id: 'novel-5',
    title: 'The Fractured Mirror',
    author: 'Lisa Zhang',
    cover: '🪞',
    description: 'A psychological thriller exploring identity, reality, and the nature of existence itself.',
    totalChapters: 22,
    rating: 4.7,
    genre: ['Thriller', 'Mystery', 'Psychological']
  }
]

const chapterTemplate = (novelId: string, chapterNum: number, title: string): Chapter => ({
  id: `${novelId}-ch-${chapterNum}`,
  novelId,
  chapterNumber: chapterNum,
  title,
  content: `Chapter ${chapterNum}: ${title}\n\n` +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n' +
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, ' +
    'totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ' +
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. ' +
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. ' +
    'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
})

export const mockChapters: Record<string, Chapter[]> = {
  'novel-1': Array.from({ length: 24 }, (_, i) => 
    chapterTemplate('novel-1', i + 1, `The Beginning - Part ${Math.floor(i / 4) + 1}`)
  ),
  'novel-2': Array.from({ length: 32 }, (_, i) => 
    chapterTemplate('novel-2', i + 1, `Journey Through Space - Episode ${i + 1}`)
  ),
  'novel-3': Array.from({ length: 18 }, (_, i) => 
    chapterTemplate('novel-3', i + 1, `Seasons of Change - Book ${Math.floor(i / 6) + 1}`)
  ),
  'novel-4': Array.from({ length: 28 }, (_, i) => 
    chapterTemplate('novel-4', i + 1, `The Quest Continues - Act ${Math.floor(i / 7) + 1}`)
  ),
  'novel-5': Array.from({ length: 22 }, (_, i) => 
    chapterTemplate('novel-5', i + 1, `Reflections - Mirror ${i + 1}`)
  )
}
