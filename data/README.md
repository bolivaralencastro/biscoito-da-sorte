# Diretório Data

Este diretório contém todos os dados estáticos utilizados pela aplicação "Biscoito da Sorte".

## Estrutura

```
data/
├── cookies.json          # Dados das variantes de biscoito (se existir)
├── fortunes.json         # Frases do biscoito da sorte
└── messages/             # Mensagens específicas por estado (se existir)
```

## Tipos de Dados

### fortunes.json
- Coleção de frases que aparecem nos biscoitos da sorte
- Cada frase pode ter metadados como categoria ou autor
- Formato: Array de objetos JSON

### cookies.json
- Dados sobre diferentes variantes de biscoito (se aplicável)
- Informações sobre imagens, estados e propriedades visuais
- Formato: Array de objetos JSON

### messages/
- Mensagens específicas para diferentes estados da aplicação
- Exemplos: Mensagens para primeiro uso, bloqueios diários, etc.
- Organizado por categorias ou estados

## Estrutura Padrão

### fortunes.json
```json
[
  {
    "id": "unique_id",
    "text": "A frase do biscoito da sorte",
    "category": "categoria_da_frase",
    "createdAt": "data_de_criacao"
  }
]
```

## Diretrizes de Uso

### Adicionando Novos Dados
1. Siga o formato JSON existente
2. Use IDs únicos para cada entrada
3. Mantenha a consistência nos campos
4. Adicione metadados relevantes quando necessário

### Manutenção
- Sempre que adicionar ou modificar dados:
  - Verifique a validade do JSON
  - Teste a aplicação para garantir que os novos dados são carregados corretamente
  - Atualize esta documentação se o formato mudar
  - Mantenha as frases apropriadas e revisadas

### Formatos
- **JSON**: Formato padrão para todos os dados estruturados
- **UTF-8**: Codificação de caracteres para suportar acentuação

## Convenções
- Use camelCase para nomes de propriedades
- Inclua um campo `id` único para cada item
- Use campos `createdAt` e `updatedAt` quando relevante para rastrear mudanças
- Mantenha as frases em português brasileiro

## Notas Importantes
- Esta pasta é referenciada no módulo `fortunes.js` e outros módulos de dados
- Qualquer alteração na estrutura deve ser refletida no código
- O carregamento dos dados é assíncrono e tratado no início da aplicação

## Instruções de Manutenção
- Sempre que modificar os dados:
  - Faça backup antes de alterações significativas
  - Teste o carregamento após as modificações
  - Atualize o CHANGELOG.md com as mudanças
  - Valide o JSON antes de commitar