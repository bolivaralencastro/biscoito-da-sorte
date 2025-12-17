# Mapa rápido do projeto (para humanos e IA)

Use este resumo para navegar sem abrir tudo. Combine com os proxies específicos:
- `docs/ui.proxy.md` — resumo de `src/js/ui.js`
- `docs/WORK_LOG.md` — log de inspeções e próximos passos de QA

## Estrutura de pastas
- `index.html`: página principal (meta tags, favicon, preconnect a Microsoft Clarity, carrega `src/js/main.js`).
- `src/js/`: módulos JS em ES6.
- `src/css/`: base e componentes de estilo.
- `assets/`: imagens e ícones.
- `data/`: frases e mensagens por estado.
- `docs/`: documentação e scripts auxiliares.
- `docs/ADR.md`: decisão sobre uso de proxies/mapas.
- `docs/TAGGING_GUIDE.md`: convenções de nomes/busca.
- `docs/MODULE_CATALOG.md`: tabela “arquivo / responsabilidade / usa / usado por”.
- `docs/UI_STATES.md`: “storybook textual” dos componentes/estados.
- `docs/DESIGN_TOKENS.md`: cores/tokens/layout/resumo CSS.

## Módulos JS (resumo e dependências principais)
- `main.js`: ponto de entrada; chama `initUI()` do `ui.js`.
- `ui.js`: controla estados do biscoito e da tirinha (cliques, arraste, mensagens, sorte/números). Depende de `audio`, `animation`, `fortunes`, `messages`, `storage`, `cookies`, `config`.
- `audio.js`: efeitos sonoros (quebrar/ mastigar).
- `animation.js`: helpers para animar migalhas, posicionar tirinha, tilt aleatório (CSS `.animate-pop` para reveal).
- `fortunes.js`: escolhe frases e gera números da sorte.
- `messages.js`: busca mensagens por estado (`data/messages/*.json`).
- `storage.js`: persiste estado diário no storage do navegador.
- `cookies.js`: variantes de imagem do biscoito (inteiro/quebrado/etc.).
- `config.js`: constantes (estados, imagens, etc.).
- `messages.js`, `cookies.js`, `storage.js` importam JSON local.

## CSS (tokens e blocos principais)
- `src/css/base.css`: tokens (`--text`, `--muted`, `--paper`, `--accent`, `--numbers`), fonte padrão, reset leve.
- `components/layout.css`: header/footer fixos, aviso diário, palco (`.stage`), sombra e vinheta.
- `components/cookie.css`: dimensões e estados do biscoito (intacto, cleaned).
- `components/fortune-strip.css`: tirinha (flip 3D, tilt, sombras), texto/números, arraste.
- `components/animations.css`: migalhas (`.crumb` + `@keyframes crumb-fall`).

## Dados
- `data/fortunes.json`: frases base (texto, tom, tema).
- `data/messages/{intact,broken,crumbs,clean}.json`: mensagens de status.

## Convenções úteis
- Estados do biscoito: `intact -> broken -> crumbs -> clean` (see `config.js` e `ui.js`).
- A tirinha só interage após o estado mudar de `intact`.
- A posição da tirinha é normalizada (`fortunePosition`) e persistida por dia.

## Dicas para IA / prompts
- Prefira proxies/resumos (este arquivo + `docs/ui.proxy.md`) para economizar tokens.
- Se precisar do trecho exato, cite o caminho e a linha aproximada (ex.: `src/js/ui.js:120` arraste da tirinha).
- Para CSS, use os tokens de `base.css` e os blocos descritos acima; só peça trechos específicos se for alterar regras.
