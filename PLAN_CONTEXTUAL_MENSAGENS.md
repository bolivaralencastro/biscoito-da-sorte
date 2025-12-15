# Plano de Mensagens Contextuais (Versão Refinada)

## O que está excelente
- Objetivo claro: contexto emocional, evitar repetição, sustentabilidade de conteúdo, base para aprendizado futuro.
- IDs únicos: habilitam histórico, persistência diária, não repetição real e métricas futuras sem tocar no texto.
- Histórico no localStorage: simples, privado, performático (escopo atual dispensa backend).
- Fallback explícito: garante frase mesmo quando não há conteúdo específico para o contexto.

## Onde há risco real
- Overfitting emocional: frases que soam óbvias/forçadas ("segunda à noite", "janeiro de manhã") e quebram o tom poético/universal.
- Combinar muitos contextos: pode perder simplicidade e identidade do ritual.

## Ajustes estratégicos (o que melhorar)
- Contexto como peso, não rótulo rígido: a frase funciona bem em certo período, mas não precisa citar o contexto explicitamente.
- Prioridade de contextos: Estado do biscoito é soberano; depois sazonais raros (ex.: Natal), depois hora do dia (leve), dia da semana (mínimo), mês quase neutro.
- Combinação moderada: no máximo Estado + 1 contexto temporal ativo por dia; nunca mais de 2 dimensões além do estado.
- Histórico por estado e tipo: separar o histórico por estado (intact/broken/crumbs/clean) e por tipo (inicial/refresh) para manter coerência emocional.
- Métricas futuras com cuidado: usar apenas para detectar frases ignoradas/repetidas; evitar ranking que mate a alma/poesia.

## Regra central refinada
O estado define o sentimento. O tempo apenas escolhe a melhor frase dentro desse sentimento.

## Plano de trabalho ajustado
1) IDs e dados
   - Adicionar IDs únicos às sortes e mensagens de estado (inicial/refresh), com esquema simples (`ctx-tipo-###`).
   - Manter tags de tom/tema; evitar termos de contexto explícitos no texto.

2) Estrutura de dados
   - Usar um arquivo consolidado com campos de contexto (ex.: `periodo_do_dia`, `dia_semana`, `estacao`) ou manifesto leve; evitar explosão de arquivos por mês/dia/hora.
   - Se subdividir, preferir eixos estáveis: estações (4) + dia da semana (7) + período do dia (4). Mês só se necessário.

3) Seleção por contexto
   - Prioridade: Estado -> (opcional) contexto especial -> período do dia -> dia da semana -> genérico.
   - Contexto influencia peso de escolha, não obriga frase a citar o tempo.
   - Combinar no máximo um contexto temporal além do estado.
   - Fallback claro: cair para genéricas se o cluster estiver vazio.

4) Histórico e não repetição
   - Guardar histórico de IDs por estado + tipo (inicial/refresh) com timestamp.
   - Janela de bloqueio (ex.: 14–21 dias) para evitar repetição recente.
   - Manter lock diário: mesma ID de sorte ao longo do dia.

5) Persistência diária
   - Salvar `fortuneId` (e tags) junto com texto/números/tom/tema.
   - Na virada do dia, gerar nova frase respeitando contexto e histórico.

6) Testes e validação
   - Verificar seleção por contexto com fallback.
   - Validar histórico e não repetição (janela configurável).
   - Garantir compatibilidade com o lock diário existente.

7) Documentação
   - Atualizar README com formato de dados (IDs, contextos, tags).
   - Guia rápido para adicionar frases/contextos sem quebrar a poesia (evitar menções explícitas a tempo/óbvios).

