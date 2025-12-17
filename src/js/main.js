// Main module for the Fortune Cookie project

import { initUI } from './ui.js';
import { loadFortunesFromJson } from './fortunes.js';
import { loadCookieVariantsFromJson } from './cookies.js';

// Import Microsoft Clarity
import * as clarity from '@microsoft/clarity';

// Initialize Clarity with the project ID
clarity.start('uloo66pzgc');

// Load fortunes and cookie variants from JSON on startup
Promise.all([loadFortunesFromJson(), loadCookieVariantsFromJson()])
  .then(async () => {
    // Initialize the UI after data is loaded
    await initUI();
  })
  .catch(async error => {
    console.error('Erro ao carregar dados iniciais:', error);
    // Even if data fails to load, initialize the UI with defaults
    await initUI();
  });
