// Messages module for managing state messages

// Function to get random message for a specific state
export async function getRandomMessageForState(state, stage = 'initial') {
  try {
    const response = await fetch(`data/messages/${state}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const stateMessages = await response.json();
    const messages = stateMessages[stage] || stateMessages.initial;
    return messages[Math.floor(Math.random() * messages.length)] || '';
  } catch (error) {
    console.error(`Erro ao carregar mensagens para estado ${state}:`, error);
    // Return a default message if loading fails
    return 'Aguardando novas palavras de sabedoria...';
  }
}

// Function to get both initial and refresh messages for a state
export async function getMessagesForState(state) {
  try {
    const response = await fetch(`data/messages/${state}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const stateMessages = await response.json();
    const randomFrom = (list) => list[Math.floor(Math.random() * list.length)] || '';
    return {
      initial: randomFrom(stateMessages.initial),
      refresh: randomFrom(stateMessages.refresh)
    };
  } catch (error) {
    console.error(`Erro ao carregar mensagens para estado ${state}:`, error);
    return {
      initial: 'Aguardando novas palavras de sabedoria...',
      refresh: 'Aguardando novas palavras de sabedoria...'
    };
  }
}
