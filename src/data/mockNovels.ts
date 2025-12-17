import { Novel } from '../types'

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`

export const novels: Novel[] = [
  {
    id: 'n1',
    title: 'The Clockwork Garden',
    author: 'A. Writer',
    description: 'A steampunk odyssey through mechanical gardens and lost cities.',
    chapters: [
      { id: 'c1', title: 'Prologue', content: lorem.repeat(6) },
      { id: 'c2', title: 'Chapter 1: Gears', content: lorem.repeat(8) },
      { id: 'c3', title: 'Chapter 2: Brass', content: lorem.repeat(10) }
    ]
  },
  {
    id: 'n2',
    title: 'Moonlit Orchard',
    author: 'B. Storyteller',
    description: 'Quiet drama in an orchard under the moonlight.',
    chapters: [
      { id: 'c1', title: 'Nightfall', content: lorem.repeat(5) },
      { id: 'c2', title: 'Harvest', content: lorem.repeat(7) }
    ]
  }
]
