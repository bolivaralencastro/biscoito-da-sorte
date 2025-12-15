// Fortunes module for managing fortunes and lucky numbers

import { BASE_FORTUNES } from './config.js';

let fortunes = normalizeFortunes(BASE_FORTUNES);

export function loadFortunesFromJson() {
  return fetch('data/fortunes.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      const loaded = normalizeFortunes(data);
      const dedup = dedupeByText([...fortunes, ...loaded]);
      fortunes = dedup;
      return dedup;
    })
    .catch(error => {
      console.error('Erro ao carregar frases externas, usando base local:', error);
      return fortunes;
    });
}

export function getRandomFortune() {
  const index = Math.floor(Math.random() * fortunes.length);
  return fortunes[index];
}

export function generateLuckyNumbers() {
  const nums = new Set();
  while (nums.size < 6) {
    nums.add(Math.floor(Math.random() * 60) + 1);
  }
  return Array.from(nums)
    .sort((a, b) => a - b)
    .map(n => n.toString().padStart(2, '0'))
    .join("  -  ");
}

export function getFortunes() {
  return [...fortunes];
}

function normalizeFortunes(list) {
  return (list || [])
    .map(item => {
      if (!item) return null;
      if (typeof item === 'string') {
        return { text: item, tone: ['classico'], theme: ['sabedoria'] };
      }
      if (item.text) {
        return {
          text: item.text,
          tone: Array.isArray(item.tone) ? item.tone : ['classico'],
          theme: Array.isArray(item.theme) ? item.theme : ['sabedoria']
        };
      }
      return null;
    })
    .filter(Boolean);
}

function dedupeByText(list) {
  const seen = new Set();
  const result = [];
  for (const item of list) {
    if (!item || !item.text) continue;
    const key = item.text.trim();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}
