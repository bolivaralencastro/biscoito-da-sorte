# Política de Segurança

## Visão Geral
Este documento descreve as práticas de segurança implementadas no projeto "Biscoito da Sorte".

## Arquitetura de Segurança

### 1. Armazenamento de Dados
- **Validação de dados**: Todos os dados armazenados passam por validação antes de serem persistidos
- **Tratamento de erros**: O sistema tem fallbacks seguros caso o armazenamento falhe
- **Três camadas de persistência**: localStorage, sessionStorage e cookies com redundância
- **Sanitização**: Dados são sanitizados antes de serem armazenados

### 2. Manipulação de Cookies
- **Codificação**: Valores de cookies são codificados com `encodeURIComponent`
- **Segurança**: Cookies usam `samesite=lax` para proteção CSRF
- **Validação**: Leitura de cookies é feita com expressões regulares seguras

### 3. Prevenção de Injeção
- Não há manipulação direta de entrada do usuário que vá para contexto sensível
- JSON é analisado de forma segura com tratamento de exceções
- Não há execução de código dinâmico baseado em entrada do usuário

### 4. Tratamento de Dados
- Os dados manipulados são de natureza não sensível (frases de biscoito da sorte)
- Não há coleta ou envio de dados pessoais
- Persistência é feita apenas no lado do cliente

## Práticas de Segurança Implementadas

### No arquivo `storage.js`:
- Validação de estrutura de dados antes de salvar
- Tratamento seguro de exceções durante operações de armazenamento
- Verificação de integridade dos dados carregados
- Proteção contra falhas em cascata (fallbacks seguros)

### No arquivo `fortunes.js`:
- Normalização e deduplicação de frases para evitar conteúdo duplicado
- Validação de estrutura de dados

### No arquivo `audio.js`:
- Uso seguro da Web Audio API
- Tratamento de contexto de áudio de forma segura

## Avaliação de Riscos

### Riscos de Baixa Prioridade (geridos):
- **XSS**: Minimizado por não haver inserção de HTML dinâmico com base em entrada do usuário
- **CSRF**: Atenuado por usar cookies com SameSite
- **Injeção de dados**: Mitigado por validação de estrutura de dados

### Riscos de Nenhuma Prioridade:
- **Dados sensíveis**: O projeto não manipula dados pessoais
- **Injeção de SQL/NoSQL**: Não há backend, apenas frontend
- **Vazamento de dados**: Não há coleta de dados do usuário

## Boas Práticas de Segurança

1. **Princípio do Menor Privilégio**: O código só faz o necessário para a funcionalidade
2. **Defesa em Profundidade**: Múltiplas camadas de proteção (validação, fallbacks)
3. **Tratamento de Erros Seguro**: Erros não expõem informações sensíveis
4. **Validação de Entrada/Saída**: Todas as operações de armazenamento são validadas

## Recomendações para Desenvolvedores

Ao adicionar novas funcionalidades:
1. Sempre validar dados antes de persistir
2. Tratar exceções de forma segura
3. Não armazenar dados sensíveis do usuário
4. Evitar execução de código dinâmico baseado em entrada do usuário
5. Testar fallbacks e caminhos de erro

## Conformidade

Este projeto:
- Não coleta dados pessoais
- Não usa dados de terceiros não verificados
- Não executa código externo não verificado
- Segue práticas de desenvolvimento seguro para aplicações client-side