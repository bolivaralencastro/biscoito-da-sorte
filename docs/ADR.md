# ADR 0001 — Proxies e mapas de navegação

- **Decisão**: Manter documentos de navegação e proxies (project map, catálogo de módulos, tokens, proxies de arquivo) para IA e onboarding humano.
- **Motivação**: Reduzir tokens em prompts, evitar reescrita completa de arquivos pela IA, facilitar localização de trechos críticos.
- **Contexto**: Projeto frontend simples, módulos pequenos; IA tende a devolver arquivos inteiros sem necessidade.
- **Consequências**:
  - Atualizar docs quando alterar estados principais, fluxos de UI ou tokens.
  - Em prompts, preferir citar caminho+linha e usar diffs curtos.
  - Reduzir risco de sobrescrever código não relacionado.***
