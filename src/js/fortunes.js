// Fortunes module for managing fortunes and lucky numbers

import { BASE_FORTUNES } from './config.js';

let fortunes = [...BASE_FORTUNES];

export function loadFortunesFromJson() {
  return fetch('data/fortunes.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      const jsonTexts = data.map(item => item.text).filter(Boolean);
      const unique = Array.from(new Set([...fortunes, ...jsonTexts]));
      fortunes = unique;
      return unique;
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
