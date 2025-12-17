# Guia de Estilo de Código

## Visão Geral
Este guia define os padrões de código a serem seguidos no projeto "Biscoito da Sorte".

## JavaScript

### Geral
- Usar ES6+ com módulos
- Usar `const` e `let` em vez de `var`
- Usar funções de seta apenas quando apropriado (evitar para métodos de objeto)
- Nomear variáveis e funções em camelCase
- Nomear constantes em UPPER_SNAKE_CASE
- Manter funções curtas e com propósito único

### Comentários
- Comentar funcionalidades complexas
- Usar comentários em português
- Evitar comentários óbvios
- Usar JSDoc ou estilo similar para funções públicas importantes

### Estrutura
- Usar módulos ES6 para import/export
- Separar lógica de UI, dados e persistência
- Manter funções assíncronas claras com async/await
- Tratar exceções adequadamente

## CSS

### Geral
- Usar kebab-case para nomes de classes
- Evitar aninhamento profundo (máximo 3 níveis)
- Usar variáveis CSS para cores e dimensões consistentes
- Seguir metodologia BEM ou similar quando apropriado

### Organização
- Agrupar estilos relacionados
- Manter ordem lógica nas regras
- Separar componentes em arquivos distintos

## HTML

### Semântica
- Usar elementos semânticos quando apropriado
- Manter estrutura acessível
- Incluir atributos ARIA onde necessário
- Usar IDs únicos

## Práticas Gerais

### Nomenclatura
- Usar nomes descritivos
- Ser consistente com convenções existentes
- Evitar abreviações desnecessárias

### Organização
- Manter separação clara de responsabilidades
- Manter arquivos razoavelmente pequenos
- Agrupar funcionalidades relacionadas

### Documentação
- Manter documentação atualizada
- Explicar decisões arquiteturais importantes
- Incluir exemplos quando apropriado