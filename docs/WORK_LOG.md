# Log de trabalho e plano

## 2025-12-16 — Correção da troca de imagens e piscada
- Problema: o `<picture>` mantinha o `srcset` inicial do biscoito intacto; ao trocar de estado o `<img>` mudava, mas o navegador continuava renderizando o intacto (sem quebrar/farelo) e, após refresh, o intacto piscava antes de limpar.
- Ação: sincronizei `updateCookieImage` para atualizar `img.src/srcset` e `source.srcset/type` conforme o estado atual; no estado `clean` ambos recebem data URI para evitar flash.
- Evidências: fluxo 1→4 em desktop e mobile (390x844) com cache ignorado exibiu imagens corretas em cada etapa e nenhuma piscada no refresh; estado clean permanece limpo após recarregar.
- Rastro de teste: ver `TESTING.md` na seção “Correção troca de imagens (2025-12-16, tarde)”.

## Plano de trabalho imediato
1) Reexecutar smoke em outro navegador (Safari/Firefox) para garantir que o comportamento do `<picture>` permanece correto sem WebP.
2) Validar arraste/posição da tirinha após resize no estado `clean` para garantir que o data URI não interfere no hitbox.
3) Se houver regressão visual reportada, capturar `currentSrc`/`srcset` via DevTools antes e depois do clique para confirmar se algum cache externo interfere.
