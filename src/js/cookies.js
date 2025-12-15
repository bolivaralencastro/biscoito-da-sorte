// Cookie variants loader and helpers

import { IMAGE_BASES } from './config.js';

const DEFAULT_VARIANT = {
  id: 'default',
  label: 'Clássico',
  states: IMAGE_BASES,
  formats: ['png', 'webp']
};

let cookieVariants = [];

export async function loadCookieVariantsFromJson() {
  try {
    const response = await fetch('data/cookies.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Formato inválido para cookies.json');
    cookieVariants = data
      .map(normalizeVariant)
      .filter(Boolean);
  } catch (error) {
    console.warn('Não foi possível carregar variações de biscoito, usando padrão.', error);
    cookieVariants = [];
  }
  return getAvailableVariants();
}

export function getRandomCookieVariant() {
  const list = getAvailableVariants();
  return list[Math.floor(Math.random() * list.length)] || DEFAULT_VARIANT;
}

export function getCookieVariantById(id) {
  if (!id) return DEFAULT_VARIANT;
  return getAvailableVariants().find(variant => variant.id === id) || DEFAULT_VARIANT;
}

function getAvailableVariants() {
  return cookieVariants.length ? cookieVariants : [DEFAULT_VARIANT];
}

function normalizeVariant(variant) {
  if (!variant?.id) return null;
  const states = { ...DEFAULT_VARIANT.states, ...(variant.states || {}) };
  const formats = Array.isArray(variant.formats) && variant.formats.length ? variant.formats.map(String) : ['png'];
  return {
    id: String(variant.id),
    label: variant.label || variant.id,
    states,
    formats
  };
}
