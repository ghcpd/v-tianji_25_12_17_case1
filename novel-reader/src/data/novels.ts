export interface Chapter {
  id: string
  title: string
  content: string
}

export interface Novel {
  id: string
  title: string
  author: string
  chapters: Chapter[]
}

export const novels: Novel[] = [
  {
    id: 'novel-1',
    title: 'The Great Adventure',
    author: 'Ada Writer',
    chapters: [
      { id: 'c1', title: 'Chapter 1', content: 'This is the beginning of the great adventure. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { id: 'c2', title: 'Chapter 2', content: 'The journey continues with more excitement. Lorem ipsum dolor sit amet.' },
      { id: 'c3', title: 'Chapter 3', content: 'And so the story unfolds further...' },
    ],
  },
  {
    id: 'novel-2',
    title: 'Mystery of the Night',
    author: 'John Mystery',
    chapters: [
      { id: 'c1', title: 'Chapter 1', content: 'It was a dark and stormy night...' },
      { id: 'c2', title: 'Chapter 2', content: 'Strange things started to happen...' },
    ],
  },
]
