# Proxy de contexto para `src/js/ui.js`

Objetivo: usar este resumo curto no lugar do arquivo completo em prompts (economia de tokens). Quando precisar do detalhe, abra o original `src/js/ui.js`.

## Responsabilidades
- Inicialização da UI (`initUI`): captura elementos do DOM, carrega `dayData`, escolhe variante do biscoito, detecta WebP, aplica estado visual, sincroniza tirinha, registra eventos.
- Evento de clique no biscoito (`handleCookieClick`): fluxo de estados `intact -> broken -> crumbs -> clean`, toca sons (`playCrack`/`playChew`), anima migalhas, revela sorte/números, atualiza `dayData`, mensagens por estado.
- Evento de clique na tirinha (`handleFortuneStripClick`): alterna frente/verso se já revelada.
- Arraste da tirinha (`setupFortuneStripDrag`): pointer events, clamp na área do palco, salva posição normalizada (`fortunePosition`), bloqueia clique se houve movimento.
- Detecção de WebP e escolha de formato (`detectWebpSupport`, `selectBestImageFormat`, `updateCookieImage`).
- Visual por estado (`applyStateVisuals`, `updateShadow`): classes, alt text, sombra, seleção da imagem correta pela variante/estado.
- Revele e anima tirinha (`revealFortune`): escolhe fortuna (ou override), números, posiciona acima do biscoito, tilt randômico, anima via a classe CSS `.animate-pop`, persiste texto/números se ainda não havia.
- Persistência diária (`updateDayData`, `loadDayData` via `storage.js`), variante diária (`ensureCookieVariant`), posição da tirinha (`saveFortunePosition`/`applyStoredFortunePosition`).
- Mensagens por estado (`ensureMessagesForState`, `showCurrentMessage`, `showDailyLockNotice`): lida com mensagens inicial/refresh e bloqueio diário.

## Estados/flags locais relevantes
- `dayData`: estado diário persistido (state, text, numbers, tone/theme, messageInitial/Refresh, fortunePosition, cookieVariantId, crunched/cleaned).
- `cookieState` + flags (`broken`, `crunched`, `cleaned`), `webpSupported`, `cookieVariant`, `imageFormat`.
- Drag: `dragOffset`, `startPos`, `moved`, `dragging` (escopo interno em drag handler).

## Dependências principais
- `audio.js`: `playCrack`, `playChew`
- `animation.js`: `createCrumbsAnimation`, `animateReveal`, `positionStripAboveCookie`, `randomizeTilt`
- `fortunes.js`: `getRandomFortune`, `generateLuckyNumbers`
- `messages.js`: `getRandomMessageForState`, `getMessagesForState`
- `storage.js`: `loadDayData`, `persistDayData`, `createDefaultDayData`
- `cookies.js`: `getCookieVariantById`, `getRandomCookieVariant`
- `config.js`: `IMAGE_BASES`, `EMPTY_DATA_URI`, `DEFAULT_COOKIE_STATE`

## Fluxo diário resumido
1. `initUI` carrega `dayData`, escolhe variante, detecta formato e aplica estado.
2. Clique no biscoito: vai quebrando/consumindo/limpando em etapas; a primeira quebra revela sorte/números e mensagens do estado.
3. Tirinha revelada pode virar (clique) e ser arrastada (pos. persistida).
4. Mensagens diárias alternam entre “initial” e “refresh”; bloqueio impede quebrar mais de uma vez/dia.

## Uso como proxy
- Para prompts: copie apenas esta seção em vez de colar `src/js/ui.js`.
- Se precisar de detalhe: cite o caminho e linha ao pedir contexto adicional, ex.: `src/js/ui.js:1-120` (inicialização e clique).***
