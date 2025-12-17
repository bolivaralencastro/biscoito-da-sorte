// Main module for the Fortune Cookie project

import { initUI } from './ui.js';
import { loadFortunesFromJson } from './fortunes.js';
import { loadCookieVariantsFromJson } from './cookies.js';

async function startClarity() {
  try {
    const clarity = await import('@microsoft/clarity');
    clarity.start('uloo66pzgc');
  } catch (error) {
    console.warn('Clarity não pôde ser carregado. Continuando sem analytics.', error);
  }
}

// Load fortunes and cookie variants from JSON on startup
Promise.all([loadFortunesFromJson(), loadCookieVariantsFromJson()])
  .then(async () => {
    // Initialize the UI after data is loaded
    await initUI();
    startClarity();
  })
  .catch(async error => {
    console.error('Erro ao carregar dados iniciais:', error);
    // Even if data fails to load, initialize the UI with defaults
    await initUI();
    startClarity();
  });
