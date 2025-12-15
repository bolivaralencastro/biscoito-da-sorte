// Main module for the Fortune Cookie project

import { initUI } from './ui.js';
import { loadFortunesFromJson } from './fortunes.js';

// Load fortunes from JSON on startup
loadFortunesFromJson()
  .then(async () => {
    // Initialize the UI after fortunes are loaded
    await initUI();
  })
  .catch(async error => {
    console.error('Erro ao carregar as sortes:', error);
    // Even if fortunes fail to load, initialize the UI with default fortunes
    await initUI();
  });
