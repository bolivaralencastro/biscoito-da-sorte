#!/bin/bash

# 🚀 Script de Configuração Automática para GitHub
# Este script automatiza a criação do repositório e o primeiro deploy

# Cores para saída no terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir mensagens
function echo_color() {
    local color="$1"
    local message="$2"
    echo -e "${color}${message}${NC}"
}

# Função para verificar se um comando existe
function command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar dependências
echo_color "${BLUE}" "🔍 Verificando dependências..."

if ! command_exists git; then
    echo_color "${RED}" "❌ Git não está instalado. Por favor, instale o Git primeiro."
    echo_color "${YELLOW}" "💡 Dica: Baixe em https://git-scm.com/"
    exit 1
fi

if ! command_exists gh; then
    echo_color "${RED}" "❌ GitHub CLI não está instalado. Vamos instalar..."
    
    # Tentar instalar GitHub CLI
    if command_exists brew; then
        echo_color "${YELLOW}" "🍺 Instalando GitHub CLI via Homebrew..."
        brew install gh
    elif command_exists apt; then
        echo_color "${YELLOW}" "📦 Instalando GitHub CLI via APT..."
        sudo apt install gh -y
    else
        echo_color "${RED}" "❌ Não foi possível instalar automaticamente. Por favor, instale manualmente."
        echo_color "${YELLOW}" "💡 Dica: Siga as instruções em https://cli.github.com/"
        exit 1
    fi
fi

# Verificar se está logado no GitHub
echo_color "${BLUE}" "🔑 Verificando autenticação com GitHub..."
if ! gh auth status >/dev/null 2>&1; then
    echo_color "${YELLOW}" "🔑 Você não está logado no GitHub CLI. Fazendo login..."
    gh auth login
fi

# Verificar se já está em um repositório git
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo_color "${YELLOW}" "⚠️  Você já está em um repositório Git. Vamos continuar a partir daqui."
    current_repo=$(git remote get-url origin 2>/dev/null || echo "nenhum")
    echo_color "${BLUE}" "📁 Repositório atual: ${current_repo}"
else
    echo_color "${GREEN}" "✅ Inicializando novo repositório Git..."
    git init
fi

# Configurar informações do usuário
if [ -z "$(git config user.name)" ]; then
    read -p "Digite seu nome: " user_name
    git config user.name "$user_name"
fi

if [ -z "$(git config user.email)" ]; then
    read -p "Digite seu email: " user_email
    git config user.email "$user_email"
fi

# Criar repositório no GitHub
echo_color "${BLUE}" "🌐 Criando repositório no GitHub..."
repo_name="biscoito-da-sorte"
github_user="bolivaralencastro"

if gh repo view "$github_user/$repo_name" >/dev/null 2>&1; then
    echo_color "${YELLOW}" "⚠️  O repositório $repo_name já existe."
    read -p "Deseja usar este repositório existente? (s/n): " use_existing
    if [ "$use_existing" != "s" ]; then
        read -p "Digite um novo nome para o repositório: " repo_name
    fi
else
    echo_color "${GREEN}" "✅ Criando novo repositório: $repo_name"
    gh repo create "$github_user/$repo_name" --public --confirm
fi

# Configurar remote
remote_url="https://github.com/$github_user/$repo_name.git"
echo_color "${BLUE}" "🔗 Configurando remote: $remote_url"
git remote add origin "$remote_url" 2>/dev/null || git remote set-url origin "$remote_url"

# Criar .gitignore
if [ ! -f ".gitignore" ]; then
    echo_color "${BLUE}" "📝 Criando arquivo .gitignore..."
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
    echo_color "${GREEN}" "✅ .gitignore criado"
fi

# Fazer commit inicial
echo_color "${BLUE}" "📦 Preparando arquivos para commit..."
git add .

echo_color "${BLUE}" "💬 Digite uma mensagem para o commit inicial:"
read -p "(Padrão: Projeto Biscoito da Sorte - Versão inicial) " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Projeto Biscoito da Sorte - Versão inicial"
fi

git commit -m "$commit_message"
echo_color "${GREEN}" "✅ Commit realizado: $commit_message"

# Enviar para GitHub
echo_color "${BLUE}" "🚀 Enviando para GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo_color "${GREEN}" "✅ Sucesso! Seu projeto foi enviado para o GitHub."
    echo_color "${BLUE}" "🌐 URL do projeto: https://$github_user.github.io/$repo_name/"
    echo_color "${BLUE}" "📁 URL do repositório: $remote_url"
    
    echo_color "${YELLOW}" "\n🎉 Próximos passos:"
    echo_color "${YELLOW}" "1. Ative o GitHub Pages nas configurações do repositório"
    echo_color "${YELLOW}" "2. Em Settings > Pages, selecione branch 'main' e folder '/ (root)'"
    echo_color "${YELLOW}" "3. Aguarde 1-5 minutos para a publicação"
    echo_color "${YELLOW}" "4. Acesse: https://$github_user.github.io/$repo_name/"
    
    echo_color "${YELLOW}" "\n💡 Dicas:"
    echo_color "${YELLOW}" "- Para atualizar: git add . && git commit -m 'sua mensagem' && git push"
    echo_color "${YELLOW}" "- Para ver as mudanças: git status"
    echo_color "${YELLOW}" "- Para clonar em outro lugar: git clone $remote_url"
else
    echo_color "${RED}" "❌ Falha ao enviar para GitHub. Verifique sua conexão e permissões."
    exit 1
fi