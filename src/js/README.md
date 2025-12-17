# Diretório JavaScript (js)

Este diretório contém todos os módulos JavaScript que compõem a lógica da aplicação "Biscoito da Sorte".

## Estrutura

```
src/js/
├── main.js            # Ponto de entrada principal
├── ui.js              # Interface do usuário e interações
├── config.js          # Configurações e constantes globais
├── fortunes.js        # Lógica e dados das frases
├── cookies.js         # Lógica das variantes de biscoito
├── storage.js         # Persistência de dados
├── animation.js       # Funções auxiliares de animação
├── audio.js           # Funções de reprodução de áudio
└── messages.js        # Gerenciamento de mensagens contextuais
```

## Descrição Detalhada dos Módulos

### main.js
**Propósito**: Ponto de entrada principal da aplicação.
- Importa e inicializa os módulos essenciais
- Gerencia o carregamento inicial de dados
- Chama a função de inicialização da UI

**Funções principais**:
- Carregamento inicial de dados de frases e biscoitos
- Inicialização da interface do usuário

### ui.js
**Propósito**: Gerencia toda a interface do usuário e interações.
- Contém a maior parte da lógica de UI (537 linhas)
- Lida com eventos do usuário (cliques, arrastar, teclado)
- Controla o estado visual da aplicação
- Coordena animações e transições

**Funções principais**:
- `initUI()`: Inicializa a interface do usuário
- `setupEventListeners()`: Configura ouvintes de eventos
- `revealFortune()`: Revela a frase e números da sorte
- `applyStateVisuals()`: Atualiza elementos visuais baseado no estado

### config.js
**Propósito**: Armazena constantes e configurações globais.
- Define chaves de armazenamento
- Configurações de imagem e formatos
- Frases base e estado padrão do biscoito
- Não contém funções, apenas dados estáticos

**Conteúdo principal**:
- `STORAGE_KEYS`: Chaves usadas no armazenamento local
- `IMAGE_BASES`: Caminhos base para diferentes formatos de imagem
- `BASE_FORTUNES`: Frases base para fallback
- `DEFAULT_COOKIE_STATE`: Estado inicial do biscoito

### fortunes.js
**Propósito**: Gerencia a lógica de frases e números da sorte.
- Carrega frases de dados externos
- Gera frases aleatórias
- Gera números da sorte
- Normaliza e deduplica frases

**Funções principais**:
- `loadFortunesFromJson()`: Carrega frases do arquivo JSON
- `getRandomFortune()`: Retorna uma frase aleatória
- `generateLuckyNumbers()`: Gera números da sorte aleatórios

### cookies.js
**Propósito**: Gerencia as diferentes variantes de biscoito.
- Carrega variantes de dados externos
- Seleciona biscoitos aleatórios
- Gerencia imagens de diferentes estados

**Funções principais**:
- `loadCookieVariantsFromJson()`: Carrega variantes do cookie
- `getRandomCookieVariant()`: Retorna uma variante aleatória
- `getCookieVariantById()`: Retorna uma variante específica

### storage.js
**Propósito**: Gerencia a persistência de dados no lado do cliente.
- Lê e escreve cookies HTTP
- Gerencia dados diários no localStorage
- Valida e persiste estado do dia

**Funções principais**:
- `loadDayData()`: Carrega dados do dia atual
- `persistDayData()`: Salva dados do dia atual
- `createDefaultDayData()`: Cria dados padrão para o dia

### animation.js
**Propósito**: Fornece funções auxiliares para animações.
- Animações de trilha de migalhas
- Animação de revelação via CSS (`.animate-pop`)
- Posicionamento e transformações

**Funções principais**:
- `createCrumbsAnimation()`: Cria efeitos de migalhas
- `animateReveal()`: Reaplica a animação `animate-pop` para a tirinha
- `positionStripAboveCookie()`: Posiciona a tira acima do cookie

### audio.js
**Propósito**: Gerencia a reprodução de efeitos sonoros.
- Usa Web Audio API para reprodução
- Efeitos de quebra e mastigação do biscoito
- Geração procedural de sons

**Funções principais**:
- `getAudioContext()`: Retorna o contexto de áudio
- `playCrack()`: Reproduz som de quebra
- `playChew()`: Reproduz som de mastigação

### messages.js
**Propósito**: Gerencia mensagens contextuais para diferentes estados.
- Mensagens específicas para diferentes estados do app
- Seleção aleatória de mensagens

**Funções principais**:
- `getRandomMessageForState()`: Retorna mensagem aleatória para estado
- `getMessagesForState()`: Retorna todas as mensagens para estado

## Padrões de Código

### Import/Export
- Uso de módulos ES6 para import/export
- Importações nomeadas para funções específicas
- Exportações nomeadas para funções públicas

### Nomenclatura
- Funções usam camelCase descritivo
- Constantes usam UPPER_SNAKE_CASE
- Variáveis usam camelCase claro e conciso

### Documentação
- Comentários em português para lógica complexa
- JSDoc ou estilo similar para funções importantes
- Comentários explicativos para decisões de implementação

## Diretrizes de Desenvolvimento

### Adicionando Novos Módulos
1. Siga o padrão de módulos ES6
2. Mantenha cada arquivo focado em uma responsabilidade
3. Evite dependências circulares
4. Use nomes de arquivo que refletem o propósito

### Modificando Módulos Existentes
- Entenda completamente a função do módulo
- Verifique impacto em outros módulos
- Teste completamente após mudanças
- Atualize esta documentação se necessário

### Convenções Importantes
- Funções curtas e focadas em uma única tarefa
- Separação clara entre lógica de UI, dados e persistência
- Tratamento adequado de erros assíncronos
- Uso de async/await para operações assíncronas

## Instruções de Manutenção
- Sempre que modificar um módulo:
  - Teste as funcionalidades afetadas
  - Verifique a integração com outros módulos
  - Atualize o CHANGELOG.md com mudanças significativas
  - Documente novas funções ou alterações importantes
- Siga os princípios de clean code e modularidade
- Mantenha as funções pequenas e com propósito único
