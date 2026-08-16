// Single source of truth for course content across all three levels.
// pages.jsx and games.jsx import from here instead of the individual data files.
import { VOCAB as VOCAB_A2, CATS as CATS_A2 } from './vocab.js';
import { VOCAB_B1A } from './vocab-b1a.js';
import { VOCAB_B1B } from './vocab-b1b.js';
import { VOCAB_B2A } from './vocab-b2a.js';
import { VOCAB_B2B } from './vocab-b2b.js';
import { GRAMMAR as GRAMMAR_A2 } from './grammar.js';
import { GRAMMAR_B1 } from './grammar-b1.js';
import { GRAMMAR_B2 } from './grammar-b2.js';

// Categories that only appear from B1 upwards.
const CATS_ADVANCED = [
  { id: 'media', icon: '📰', en: 'Media & news', tr: 'Medya & haber' },
  { id: 'society', icon: '👥', en: 'Society', tr: 'Toplum' },
  { id: 'law', icon: '⚖️', en: 'Law & justice', tr: 'Hukuk & adalet' },
  { id: 'connectors', icon: '🔗', en: 'Linking words', tr: 'Bağlaçlar' },
  { id: 'academic', icon: '🎓', en: 'Academic language', tr: 'Akademik dil' },
  { id: 'science', icon: '🔬', en: 'Science & technology', tr: 'Bilim & teknoloji' },
  { id: 'economy', icon: '📈', en: 'Economy & business', tr: 'Ekonomi & iş dünyası' },
  { id: 'politics', icon: '🗳️', en: 'Politics', tr: 'Siyaset' },
  { id: 'environment', icon: '🌍', en: 'Environment & climate', tr: 'Çevre & iklim' },
  { id: 'culture', icon: '🎭', en: 'Culture & arts', tr: 'Kültür & sanat' },
  { id: 'psychology', icon: '🧠', en: 'Mind & character', tr: 'Zihin & karakter' },
  { id: 'abstract', icon: '💭', en: 'Abstract concepts', tr: 'Soyut kavramlar' },
  { id: 'idioms', icon: '💬', en: 'Idioms & expressions', tr: 'Deyimler & kalıplar' },
];

const withLevel = (arr, level) => arr.map((x) => (x.level ? x : { ...x, level }));

// The level word lists were authored separately, so a word can appear in more than one.
// Keep the first (= lowest level) occurrence: you learn a word once, at the level it first
// becomes useful.
const seen = new Set();
const dedupe = (arr) =>
  arr.filter((w) => {
    const k = w.nl.toLowerCase().trim();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

export const VOCAB = [
  ...dedupe(withLevel(VOCAB_A2, 'A2')),
  ...dedupe(VOCAB_B1A),
  ...dedupe(VOCAB_B1B),
  ...dedupe(VOCAB_B2A),
  ...dedupe(VOCAB_B2B),
];

export const GRAMMAR = [
  ...withLevel(GRAMMAR_A2, 'A2'),
  ...GRAMMAR_B1,
  ...GRAMMAR_B2,
];

export const CATS = [...CATS_A2, ...CATS_ADVANCED];

export const vocabFor = (level) => VOCAB.filter((w) => w.level === level);
export const grammarFor = (level) => GRAMMAR.filter((l) => l.level === level);
// Categories that actually have words at this level, in CATS order.
export const catsFor = (level) => {
  const used = new Set(vocabFor(level).map((w) => w.cat));
  return CATS.filter((c) => used.has(c.id));
};
