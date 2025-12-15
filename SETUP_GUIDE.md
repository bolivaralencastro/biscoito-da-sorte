# 🚀 Guia de Configuração Rápida

Este guia explica como usar o script automatizado para publicar seu projeto "Biscoito da Sorte" no GitHub.

## 📋 Requisitos

Antes de executar o script, certifique-se de ter:

1. **Git instalado**
   - Verifique: `git --version`
   - Instale: [https://git-scm.com/](https://git-scm.com/)

2. **GitHub CLI instalado**
   - Verifique: `gh --version`
   - Instale: [https://cli.github.com/](https://cli.github.com/)

3. **Conta no GitHub**
   - Cadastre-se: [https://github.com/join](https://github.com/join)

## 🎬 Como usar o script automatizado

### 1. Navegue até a pasta do projeto

```bash
cd "/Users/bolivaralencastro/biscoito-da-sorte"
```

### 2. Execute o script

```bash
./setup-github.sh
```

### 3. Siga as instruções

O script vai guiá-lo pelo processo:

1. **Verificação de dependências**: Checa se Git e GitHub CLI estão instalados
2. **Autenticação**: Faz login na sua conta GitHub (se necessário)
3. **Configuração**: Define seu nome e email para commits
4. **Criação do repositório**: Cria `biscoito-da-sorte` no GitHub
5. **Commit inicial**: Prepara e envia todos os arquivos
6. **Publicação**: Envia para o GitHub

## 🐱 Manual: Passo a Passo (sem script)

Se preferir fazer manualmente:

### 1. Inicialize o Git

```bash
cd "/Users/bolivaralencastro/biscoito-da-sorte"
git init
```

### 2. Configure seu usuário

```bash
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

### 3. Crie o repositório no GitHub

- Acesse: [https://github.com/new](https://github.com/new)
- Nome: `biscoito-da-sorte`
- Visibilidade: Pública
- Clique em "Create repository"

### 4. Adicione o remote

```bash
git remote add origin https://github.com/bolivaralencastro/biscoito-da-sorte.git
```

### 5. Crie um .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependências
node_modules/

# Ambiente de desenvolvimento
.env
.DS_Store

# Arquivos de build
/dist
/build

# Arquivos de log
*.log

# Arquivos de sistema
Thumbs.db
EOF
```

### 6. Faça o primeiro commit

```bash
git add .
git commit -m "Projeto Biscoito da Sorte - Versão inicial"
```

### 7. Envie para o GitHub

```bash
git push -u origin main
```

## 🌐 Ativando GitHub Pages

Após enviar os arquivos:

1. **Acesse as configurações**:
   - Vá para: `https://github.com/bolivaralencastro/biscoito-da-sorte/settings/pages`

2. **Configure o GitHub Pages**:
   - Source: `main` branch
   - Folder: `/ (root)`
   - Clique em **Save**

3. **Aguarde a publicação**:
   - Leva de 1 a 5 minutos
   - Você verá: "Your site is published at https://bolivaralencastro.github.io/biscoito-da-sorte/"

## 🔄 Atualizando o Projeto

Para fazer atualizações:

```bash
# Faça suas alterações nos arquivos
git add .
git commit -m "Descreva suas alterações"
git push origin main
```

As alterações serão refletidas no GitHub Pages em até 1 minuto.

## ⚠️ Solução de Problemas

### Problema: "gh" não encontrado
**Solução**: Instale o GitHub CLI
```bash
# macOS (Homebrew)
brew install gh

# Linux (APT)
sudo apt install gh

# Windows (Chocolatey)
choco install gh
```

### Problema: Permissão negada ao executar script
**Solução**: Dê permissão de execução
```bash
chmod +x setup-github.sh
```

### Problema: GitHub Pages não aparece
**Solução**:
1. Verifique se o branch está correto (`main`)
2. Aguarde 5 minutos
3. Verifique em Settings > Pages se há erros
4. Tente acessar diretamente: `https://bolivaralencastro.github.io/biscoito-da-sorte/`

## 🎨 Personalização

### Mudar o nome do repositório
Se quiser um nome diferente:
1. Mude a variável `repo_name` no script
2. Ou renomeie manualmente no GitHub

### Usar domínio customizado
1. Compre um domínio (ex: biscoito-da-sorte.com ou bolivaralencastro.com)
2. Em Settings > Pages, adicione o domínio
3. Configure o DNS conforme as instruções

## 📊 O que o script faz automaticamente

✅ Verifica e instala dependências  
✅ Faz login no GitHub  
✅ Configura Git localmente  
✅ Cria repositório no GitHub  
✅ Configura .gitignore  
✅ Faz commit inicial  
✅ Envia para GitHub  
✅ Fornece instruções para GitHub Pages  

## 💡 Dicas Avançadas

1. **Use branches**: Crie um branch `dev` para testes
2. **GitHub Actions**: Configure CI/CD para validação automática
3. **Issues**: Use o sistema de issues para acompanhar melhorias
4. **Pull Requests**: Aceite contribuições da comunidade

Parabéns! Seu projeto "Biscoito da Sorte" está pronto para ser compartilhado com o mundo! 🎉