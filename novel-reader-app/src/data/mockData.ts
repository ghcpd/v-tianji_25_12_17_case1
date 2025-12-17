import type { Novel, Chapter } from '../types';

export const mockNovels: Novel[] = [
  {
    id: '1',
    title: 'The Chronicles of Eternity',
    author: 'Sarah Johnson',
    description: 'An epic fantasy adventure spanning across multiple realms and timelines. Follow the journey of a young mage discovering ancient secrets that could reshape the world.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    totalChapters: 45,
    category: 'Fantasy'
  },
  {
    id: '2',
    title: 'Digital Dreams',
    author: 'Alex Chen',
    description: 'A cyberpunk thriller set in a dystopian future where reality and virtual worlds blur. Experience the underground resistance fighting corporate tyranny.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    totalChapters: 32,
    category: 'Sci-Fi'
  },
  {
    id: '3',
    title: 'Whispers in the Garden',
    author: 'Emily Roberts',
    description: 'A heartwarming tale of love, loss, and rediscovery set in a beautiful countryside estate. Secrets buried in the past slowly come to light.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    totalChapters: 28,
    category: 'Romance'
  },
  {
    id: '4',
    title: 'The Mystery of Blackwood Manor',
    author: 'James Harrison',
    description: 'A detective noir mystery where nothing is as it seems. Unravel the twisted plot of murders, betrayal, and hidden identities in Victorian London.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    totalChapters: 38,
    category: 'Mystery'
  },
  {
    id: '5',
    title: 'Celestial Warriors',
    author: 'Lin Mei',
    description: 'An action-packed cultivation novel following a young warrior\'s path to immortality. Master ancient techniques and challenge the heavens themselves.',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
    totalChapters: 120,
    category: 'Action'
  }
];

export const mockChapters: Chapter[] = [
  // The Chronicles of Eternity - Chapters
  {
    id: '1-1',
    novelId: '1',
    chapterNumber: 1,
    title: 'The Awakening',
    content: `The morning sun cast long shadows across the ancient library as Elara traced her fingers along the dusty spines of forgotten tomes. She had always felt drawn to this place, though she couldn't explain why.

"Still here, I see," Master Aldrin's voice echoed through the vast chamber. "You know, most apprentices your age are eager to practice combat spells, not bury themselves in old books."

Elara turned, her silver eyes reflecting the candlelight. "These books hold knowledge that's been lost for centuries. Surely understanding the past is just as important as preparing for the future?"

The old mage smiled knowingly. "Perhaps you're right. Though I wonder if you're seeking knowledge, or if knowledge is seeking you."

Before she could respond, the book she'd been reaching for suddenly glowed with an ethereal blue light. The temperature in the room dropped, and whispers in an ancient tongue filled the air. This was the moment that would change everything.

The pages flew open of their own accord, revealing symbols that seemed to dance and shift before her eyes. Elara felt a surge of power unlike anything she'd experienced before. The Mark of the Ancients was awakening, and she was its chosen vessel.

"Impossible," Master Aldrin breathed, his face pale. "The prophecy... it was true all along."

As the light intensified, Elara knew her quiet life of study was over. The Chronicles of Eternity had begun, and she was now part of a story written long before her birth.`
  },
  {
    id: '1-2',
    novelId: '1',
    chapterNumber: 2,
    title: 'The First Trial',
    content: `Three days had passed since the awakening, and Elara still couldn't control the power that now coursed through her veins. Every emotion sparked magical energy, causing books to levitate or candles to burst into flame.

Master Aldrin had summoned the Council of Mages, their stern faces making it clear this was no ordinary occurrence. They sat in a semicircle, their robes bearing the sigils of their respective schools of magic.

"The Mark appears once every thousand years," began Councilor Theron, his voice grave. "Its bearer must undergo the Three Trials, or risk losing themselves to the power entirely."

Elara's hands trembled. "What are these trials?"

"Tests of mind, body, and spirit," answered Councilor Lyra, the youngest of the group. "They will push you beyond your limits. Many who have borne the Mark before you did not survive."

"When do I begin?" Elara asked, her voice steadier than she felt.

"Immediately," Master Aldrin said, placing a reassuring hand on her shoulder. "But know this, my student—you don't face this alone."

The first trial would take her deep into the Whispering Woods, where reality itself bent to the will of ancient magic. Armed with only her wits and the unpredictable power of the Mark, Elara stepped through the portal that would take her to her destiny.

The Woods greeted her with an eerie silence, broken only by the sound of her own heartbeat. Somewhere in this maze of twisted trees and shifting paths lay the first key to mastering her newfound abilities.

And somewhere in the shadows, something was watching, waiting for her to fail.`
  },
  {
    id: '1-3',
    novelId: '1',
    chapterNumber: 3,
    title: 'Shadows and Secrets',
    content: `The Whispering Woods lived up to their name. Every rustle of leaves, every snap of a twig carried voices—some warning, some threatening, some pleading. Elara had learned quickly not to trust any of them.

She'd been walking for hours, or was it days? Time moved differently here. The ancient trees seemed to shift position when she wasn't looking, creating an ever-changing labyrinth designed to confuse and disorient.

A clearing appeared ahead, and in its center stood a mirror taller than any building Elara had ever seen. Its surface rippled like water, reflecting not her image but countless versions of herself, each making different choices, living different lives.

"The Trial of Mind," she whispered, recognizing it from the old texts.

One reflection showed her as a powerful archmage, feared and respected. Another showed her as a humble teacher, surrounded by grateful students. Yet another showed her consumed by the Mark's power, eyes glowing with madness.

"Choose," a voice echoed from everywhere and nowhere. "Choose who you will become."

But Elara understood the trap. This wasn't about choosing a future—it was about accepting that all these paths were possible, and that true wisdom lay in understanding she was not defined by any single choice.

She stepped toward the mirror and placed her palm against its surface. "I choose to remain myself," she declared. "Not what others fear I might become, nor what they hope I'll be. Just Elara."

The mirror shattered into a thousand points of light, each one a firefly dancing into the twilight sky. Where it had stood now lay a single key, humming with magical energy.

One trial down. Two to go.

As she picked up the key, Elara noticed something in the tree line—a figure in dark robes, watching. Before she could call out, it vanished like smoke in the wind.

She wasn't alone in the Woods, and she had a feeling the next trial would be far more dangerous.`
  },
  // Digital Dreams - Chapters
  {
    id: '2-1',
    novelId: '2',
    chapterNumber: 1,
    title: 'Neon Awakening',
    content: `Rain hammered against the windows of Jin's cramped apartment, each drop reflecting the neon advertisements that never slept. In Neo-Tokyo, the night was brighter than the day, and the virtual world was more real than reality itself.

Jin pulled the neural interface cable from the port behind his ear, the familiar headache washing over him as his consciousness fully returned to his physical body. He'd spent the last eight hours in the Grid, running data packages for whoever would pay enough to keep him fed.

His apartment was a mess—takeout containers piled high, screens flickering with code, and the faint smell of burnt circuits. But it was home, and more importantly, it was off the corporate grid.

A message notification blinked on his retinal display. Unknown sender. That was never good.

"Mr. Chen, we know what you can do. We know you're more than just a data courier. The resistance needs people like you. Meet us at the Neon Dragon. Tonight. Come alone. -Z"

Jin's heart raced. The resistance was just a myth, wasn't it? Underground hackers fighting against the mega-corporations that controlled everything? He'd always thought they were just stories parents told their kids to give them hope.

But if they were real, and if they knew about his abilities—his unique talent for navigating the deepest layers of the Grid where even AI security couldn't follow—then maybe, just maybe, his life of running packages for corporate criminals could mean something more.

He looked at his reflection in the dark screen. Twenty-three years old, already tired of living. Maybe it was time to start fighting.

Jin grabbed his jacket, checked his neural interface one more time, and headed for the door. The Neon Dragon awaited, and with it, his first step into a war he didn't know was being fought.

Outside, the city pulsed with digital life, unaware that tonight, one more soldier would join the fight for freedom.`
  },
  {
    id: '2-2',
    novelId: '2',
    chapterNumber: 2,
    title: 'The Neon Dragon',
    content: `The Neon Dragon was exactly what Jin expected—a dive bar in the underbelly of the city where the lights flickered more than they shone and every patron looked like they had something to hide.

He scanned the room with his enhanced vision, picking up heat signatures and neural interface activity. Most people here were jacked into personal entertainment feeds, oblivious to the physical world. But in the corner booth, someone sat completely disconnected, analog in a digital world.

She was young, maybe younger than him, with close-cropped purple hair and eyes that seemed to see right through his carefully constructed defenses. A data-tat glowed faintly on her neck—the mark of a high-level netrunner.

"Jin Chen," she said as he approached. It wasn't a question. "I'm Zara. Thanks for coming."

"You didn't give me much choice," he replied, sliding into the booth. "How did you find me?"

"The resistance has eyes everywhere, even in places the corporations think they control." She slid a drink across the table. "Don't worry, it's clean. Unlike everything else in this city."

Jin ignored the drink. "What do you want from me?"

"Direct. I like that." Zara leaned forward. "We want you to help us do something impossible. We want you to infiltrate OmniCorp's central server and steal the source code for Project Mindscape."

Jin nearly laughed. "That's not impossible—that's suicide. Their security is unhackable. AI defense systems, quantum encryption, neural traps that can fry your brain if you so much as look at them wrong."

"We know," Zara said calmly. "That's why we need you. You can navigate the Deep Grid, the space between spaces where their systems can't reach. We've been watching you, Jin. You're special."

"And if I say no?"

"Then you go back to running data for the same corporations we're fighting, slowly selling your soul until there's nothing left." She stood to leave. "But I don't think you will. I think you've been waiting your whole life for someone to give you a reason to fight."

She was right, and they both knew it.

"When do we start?" Jin asked.

Zara smiled for the first time. "Follow me. The others are waiting."

As Jin followed her through a hidden door behind the bar, he realized he'd just crossed a line he could never uncross. The war for humanity's future had just become personal.`
  },
  // Whispers in the Garden - Chapters
  {
    id: '3-1',
    novelId: '3',
    chapterNumber: 1,
    title: 'Return to Rosewood',
    content: `The gravel crunched under the taxi's tires as it wound up the long driveway to Rosewood Estate. Emma pressed her face against the window, watching the rose gardens she'd once played in come into view, now wild and overgrown from years of neglect.

"You sure you want me to leave you here, miss?" the driver asked, eyeing the imposing Victorian manor with concern. "Looks like nobody's lived here for years."

"I'm sure," Emma said softly, though her heart was pounding. "Thank you."

She stood alone before the house as the taxi disappeared down the drive. Ten years. It had been ten years since she'd set foot on this property, since the day her grandmother passed away and the family scattered like autumn leaves.

The key was heavy in her pocket—the letter from the estate lawyer had been clear. The property was hers now, along with all its memories and secrets. But standing here, looking up at the house that had once been filled with laughter and now stood silent and dark, Emma wondered if she'd made a mistake coming back.

The front door creaked open at her touch, unlocked after all these years. Dust motes danced in the afternoon sunlight streaming through the dirty windows. Everything was exactly as she remembered—the grandfather clock in the hall, the portraits of ancestors lining the walls, the staircase with its ornate bannister.

"Hello?" her voice echoed through the empty rooms. "Is anyone here?"

Of course there wasn't. She was alone. Just her and the ghosts of her childhood.

As Emma moved through the house, memories flooded back. Her grandmother teaching her to bake in the kitchen. Reading books in the library on rainy afternoons. Playing hide and seek with her sister in the vast gardens.

Then she saw it—her grandmother's study, door slightly ajar. The lawyer had mentioned her grandmother left something for her, something that couldn't be put in the official will. Emma's hand trembled as she pushed the door open.

On the desk lay a single letter, sealed with wax, with her name written in her grandmother's elegant script. And next to it, a small brass key attached to a note that read: "The garden remembers. The truth blooms in spring."

Emma picked up the letter, her heart racing. Whatever secrets Rosewood held, she was about to discover them. The whispers in the garden were calling her home.`
  }
];
