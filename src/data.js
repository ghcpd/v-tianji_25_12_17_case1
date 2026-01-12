export const MOCK_NOVELS = [
  {
    id: 'n-1',
    title: 'The Lighthouse at Ember Bay',
    author: 'A. K. Rivers',
    desc: 'A contemplative tale of shipwrecks, letters, and the light that binds them.',
    cover: 'LB',
    chapters: Array.from({ length: 8 }, (_, i) => ({
      id: `n1-c${i + 1}`,
      title: `Chapter ${i + 1}: ${['Dawn','Drift','The Knot','Tide','Ashore','Embers','Resolve','Home'][i]}`,
      body: `This is the text of chapter ${i + 1}.\n\n` +
        `\tThe sea remembers. In that quiet hour the lighthouse keeper would trace the horizon and whisper names into the wind. ` +
        `The protagonist moves through rooms of memory and small kindnesses. This chapter explores time and how a single light can hold entire histories.`,
      words: 560 + i * 20
    }))
  },
  {
    id: 'n-2',
    title: 'Clockwork Orchard',
    author: 'M. Song',
    desc: 'An intimate sci-fi about caretakers of a mechanical orchard and the secret beneath the roots.',
    cover: 'CO',
    chapters: Array.from({ length: 6 }, (_, i) => ({
      id: `n2-c${i + 1}`,
      title: `Chapter ${i + 1}: ${['Seed','Sprout','Graft','Bloom','Hollow','Harvest'][i]}`,
      body: `Chapter ${i + 1} explores the clockwork beating beneath the orchard.\n\n` +
        `Caretakers oil gears at night and read schematics as if they were poems. Machines learn to keep their own counsel.`,
      words: 430 + i * 10
    }))
  },
  {
    id: 'n-3',
    title: 'Letters from the Mountain',
    author: 'I. Halden',
    desc: 'Collected correspondence that maps love, weather, and the small math of leaving.',
    cover: 'LM',
    chapters: Array.from({ length: 5 }, (_, i) => ({
      id: `n3-c${i + 1}`,
      title: `Letter ${i + 1}`,
      body: `A letter always asks for an answer. In this installment the writer returns to an empty hearth and counts the ways light divides.`,
      words: 300 + i * 5
    }))
  }
];