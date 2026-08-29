import { useEffect, useState } from 'react';

// Translations of the example sentences live apart from the word lists and are fetched
// only when a screen actually needs them, so the first page load stays small.
const loaders = {
  A2: [() => import('./a2a.js'), () => import('./a2b.js')],
  B1: [() => import('./b1a.js'), () => import('./b1b.js')],
  B2: [() => import('./b2a.js'), () => import('./b2b.js'), () => import('./b2c.js')],
};

const cache = {};
const pending = {};

export function loadEx(level) {
  if (cache[level]) return Promise.resolve(cache[level]);
  if (!pending[level]) {
    pending[level] = Promise.all((loaders[level] || []).map((l) => l()))
      .then((mods) => {
        const merged = {};
        for (const m of mods) Object.assign(merged, Object.values(m)[0]);
        cache[level] = merged;
        return merged;
      })
      .catch(() => {
        cache[level] = {}; // a missing translation file must never break a screen
        return cache[level];
      });
  }
  return pending[level];
}

// Returns { [wordId]: [english, turkish] } — empty until the file has loaded.
export function useExamples(level) {
  const [ex, setEx] = useState(() => cache[level] || {});
  useEffect(() => {
    let alive = true;
    loadEx(level).then((m) => alive && setEx(m));
    return () => { alive = false; };
  }, [level]);
  return ex;
}

// The example translation for one word, in the active UI language.
export function exText(ex, word, lang) {
  // newer word lists carry their translation inline instead of in a separate file
  if (word?.exEn || word?.exTr) return lang === 'tr' ? word.exTr || word.exEn : word.exEn || word.exTr;
  const pair = ex?.[word?.id];
  if (!pair) return '';
  return lang === 'tr' ? pair[1] : pair[0];
}
