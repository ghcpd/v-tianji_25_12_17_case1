import type { Novel } from './types';

export const mockNovels: Novel[] = [
  {
    id: '1',
    title: 'The Great Adventure',
    author: 'John Doe',
    description: 'A thrilling tale of exploration and discovery.',
    coverUrl: 'https://via.placeholder.com/150',
    chapters: [
      {
        id: '1-1',
        title: 'Chapter 1: The Beginning',
        content: 'Once upon a time, in a land far away, there was a young adventurer named Alex. Alex dreamed of exploring the unknown. One day, Alex set out on a journey to find the lost city of gold.\n\nThe path was treacherous, filled with wild animals and dangerous cliffs. But Alex was determined. With a map in hand and courage in heart, Alex pressed on.',
      },
      {
        id: '1-2',
        title: 'Chapter 2: The Forest',
        content: 'As Alex entered the dense forest, the trees seemed to whisper secrets. Strange creatures lurked in the shadows. Alex encountered a wise old owl who offered guidance.\n\n"Follow the river," the owl hooted. Alex heeded the advice and soon found a hidden path.',
      },
    ],
  },
  {
    id: '2',
    title: 'Mystery of the Old Manor',
    author: 'Jane Smith',
    description: 'A suspenseful story of secrets and intrigue.',
    coverUrl: 'https://via.placeholder.com/150',
    chapters: [
      {
        id: '2-1',
        title: 'Chapter 1: Arrival',
        content: 'Sarah arrived at the old manor on a stormy night. The house creaked with every gust of wind. She had inherited it from her late uncle, but rumors of hauntings made her uneasy.\n\nAs she stepped inside, a chill ran down her spine.',
      },
      {
        id: '2-2',
        title: 'Chapter 2: The Discovery',
        content: 'Exploring the attic, Sarah found an old diary. It belonged to her uncle and contained cryptic messages. "The key is in the garden," one entry read.\n\nDetermined to uncover the truth, Sarah ventured outside despite the rain.',
      },
    ],
  },
];