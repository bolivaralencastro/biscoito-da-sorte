# Catálogo de módulos (JS e dados)

| Arquivo | Responsabilidade | Usa | É usado por |
| --- | --- | --- | --- |
| src/js/main.js | Ponto de entrada; inicializa UI | ui.js | index.html |
| src/js/ui.js | Estados do biscoito/tirinha, eventos, mensagens, persistência diária | audio.js, animation.js, fortunes.js, messages.js, storage.js, cookies.js, config.js | main.js |
| src/js/audio.js | Tocar sons de quebrar/mastigar | - | ui.js |
| src/js/animation.js | Migalhas, reveal com `.animate-pop`, posicionamento da tirinha, tilt aleatório | DOM | ui.js |
| src/js/fortunes.js | Seleciona fortuna e gera números | data/fortunes.json, config.js | ui.js |
| src/js/messages.js | Mensagens por estado | data/messages/*.json | ui.js |
| src/js/storage.js | Persiste estado diário (localStorage) | createDefaultDayData (config.js) | ui.js |
| src/js/cookies.js | Variantes de imagem do biscoito | config.js | ui.js |
| src/js/config.js | Constantes (estados, imagens, bases) | - | ui.js, fortunes.js, cookies.js, storage.js |
| data/fortunes.json | Base de frases (texto, tom, tema) | - | fortunes.js |
| data/messages/*.json | Mensagens por estado | - | messages.js |

> Dica: combine esta tabela com `docs/PROJECT_MAP.md` e `docs/ui.proxy.md` para prompts e navegação rápida.***
