# Diretório Source (src)

Este diretório contém todo o código-fonte da aplicação "Biscoito da Sorte".

## Estrutura

```
src/
├── css/           # Estilos em cascata (CSS)
│   ├── base.css           # Estilos base da aplicação
│   └── components/        # Estilos por componente
│       ├── layout.css     # Estilos de layout
│       ├── cookie.css     # Estilos do biscoito
│       ├── fortune-strip.css  # Estilos da tira de sorte
│       └── animations.css # Estilos de animação
└── js/            # Código JavaScript
    ├── main.js            # Ponto de entrada principal
    ├── ui.js              # Lógica da interface do usuário
    ├── config.js          # Configurações globais
    ├── fortunes.js        # Lógica das frases
    ├── cookies.js         # Lógica das variantes de biscoito
    ├── storage.js         # Persistência de dados
    ├── animation.js       # Funções de animação
    ├── audio.js           # Funções de áudio
    └── messages.js        # Gerenciamento de mensagens
```

## Arquitetura de Código

### JavaScript (Módulos ES6)
A aplicação usa módulos ES6 para organizar o código:

- `main.js`: Ponto de entrada, responsável por inicializar o aplicativo
- `ui.js`: Gerencia toda a interatividade e interface do usuário
- `config.js`: Constantes e configurações globais
- `fortunes.js`: Lógica para obtenção e geração de frases
- `cookies.js`: Gerencia diferentes variantes de biscoito
- `storage.js`: Camada de persistência (localStorage, cookies)
- `animation.js`: Funções auxiliares para animações
- `audio.js`: Funções para reprodução de efeitos sonoros
- `messages.js`: Gerenciamento de mensagens contextuais

### CSS (Componentes Modulares)
A folha de estilos é dividida em componentes para melhor manutenção:

- `base.css`: Estilos globais e resets
- `components/layout.css`: Estrutura e layout principal
- `components/cookie.css`: Estilos específicos para o biscoito
- `components/fortune-strip.css`: Estilos para a tira de sorte
- `components/animations.css`: Classes para animações

## Padrões de Código

### JavaScript
- Uso de módulos ES6 para import/export
- Funções com nomes descritivos
- Comentários em português para lógica complexa
- Separação de preocupações (UI, dados, persistência)

### CSS
- Componentes modulares e reutilizáveis
- Uso de variáveis CSS para cores e dimensões
- Nomenclatura semântica
- Responsividade integrada

## Diretrizes de Desenvolvimento

### Adicionando Novos Componentes
1. Siga o padrão de módulos ES6
2. Mantenha funções curtas e focadas em uma única responsabilidade
3. Documente funções complexas
4. Use nomes descritivos para variáveis e funções

### Manutenção
- Sempre que adicionar ou modificar código:
  - Teste a funcionalidade implementada
  - Verifique impacto em outros módulos
  - Atualize esta documentação se necessário
  - Siga os princípios de clean code

### Formatos e Convenções
- **JavaScript**: ES6+, módulos, funções assíncronas quando apropriado
- **CSS**: BEM methodology (Block Element Modifier) ou convenção similar
- **Nomeação**: camelCase para JavaScript, kebab-case para CSS
- **Indentação**: 2 espaços para consistência

## Notas Importantes
- Esta pasta contém o núcleo da aplicação
- Qualquer alteração deve ser testada cuidadosamente
- O código segue boas práticas de modularidade
- As animações avançadas usam CSS keyframes e classes utilitárias como `.animate-pop`

## Instruções de Manutenção
- Siga as convenções de nomenclatura
- Documente funções complexas
- Teste mudanças antes de commitar
- Atualize o CHANGELOG.md quando necessário
- Mantenha a separação de preocupações
