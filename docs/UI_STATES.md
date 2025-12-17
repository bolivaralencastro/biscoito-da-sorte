# UI: estados e componentes

## Componentes principais
- Cookie (`#cookieImage`): estados `intact`, `broken`, `crumbs`, `clean`; classes `broken`, `crumbled`, `cleaned` ajustam visual/sombra.
- Tirinha (`#fortuneStrip`, `.fortune-inner`, `#fortuneText`, `#luckyNumbers`): revela após quebrar; flip 3D (`.flipped`), animação de reveal, arraste com posição persistida.
- Mensagens diárias (`#dailyNotice`): exibe mensagens por estado (initial/refresh), bloqueio de múltiplas quebras no mesmo dia.
- Sombra (`.cookie-shadow`) e vinheta (`.vignette-overlay`): efeitos de profundidade/foco.
- Migalhas (`.crumb`): geradas ao quebrar, animadas e removidas.

## Fluxo de estados
1. `intact` → clique: toca som, gera migalhas, revela tirinha, salva fortuna/números.
2. `broken` → novo clique: vira `crumbs` (mastigar).
3. `crumbs` → novo clique: vira `clean` (limpo).
4. `clean`: some cookie/ sombra; tirinha permanece arrastável.

## Interações
- Clique no biscoito: avança estado; bloqueio diário impede reset para intacto.
- Clique na tirinha: flip frente/verso (sorte ↔ números).
- Arraste na tirinha: pointer events; clamp na área do palco; posição salva em ratios.
- Mensagens: alterna initial/refresh por estado; exibidas no `dailyNotice`.

## Acessibilidade
- (sugestão) Tirinha com `tabindex=0`, `role=button`, `aria-pressed` e suporte a Enter/Espaço para flip.

Use este guia como “storybook textual”: estados, interações e classes envolvidas.***
