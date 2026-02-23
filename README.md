# Blog Educacional FIAP - Front-End

Este repositório contém o front-end da aplicação de blogging dinâmico desenvolvida como Tech Challenge para a FIAP. A interface foi construída com foco em responsividade, acessibilidade e facilidade de uso para professores e alunos.

## 🚀 Tecnologias Utilizadas

- **React 19**: Biblioteca base para construção da UI.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Vite**: Build tool extremamente rápida para desenvolvimento moderno.
- **Tailwind CSS 4**: Estilização moderna e utilitária para design responsivo.
- **React Router 7**: Gerenciamento de rotas e navegação.
- **Axios**: Integração com a API REST do back-end.
- **Lucide React**: Conjunto de ícones consistentes.
- **Context API**: Gerenciamento de estado global para autenticação e postagens.

## 🏗️ Arquitetura da Aplicação

A aplicação segue uma estrutura organizada por responsabilidades:

- `src/components`: Componentes reutilizáveis (Navbar, ProtectedRoute).
- `src/contexts`: Provedores de estado global (Auth, Posts).
- `src/pages`: Páginas completas da aplicação (Home, Admin, Login, etc).
- `src/services`: Configuração do Axios e chamadas à API.
- `src/types`: Definições de interfaces TypeScript para modelos de dados.
- `src/assets`: Recursos estáticos como imagens e SVGs.

### Autenticação e Autorização

A aplicação utiliza JWT (JSON Web Token) para gerenciar sessões de professores. 
- O `AuthContext` gerencia o estado do usuário e armazena o token no `localStorage`.
- Um interceptor do Axios anexa automaticamente o token no cabeçalho das requisições autenticadas.
- Rotas administrativas são protegidas pelo componente `ProtectedRoute`.

## ⚙️ Configuração Inicial

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/blog-educacional-fiap-challenge-fe.git
   cd blog-educacional-fiap-challenge-fe
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz (caso não exista) com:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📖 Guia de Uso

### Público (Estudantes/Visitantes)
- **Página Inicial**: Visualize a lista de postagens recentes e utilize o campo de busca para filtrar por palavras-chave.
- **Leitura de Post**: Clique em qualquer post para ler o conteúdo completo e detalhes do autor.

### Administrativo (Professores)
- **Login**: Acesse via botão "Acesso Restrito". Para o protótipo, qualquer e-mail/senha é aceito devido ao mock de autenticação.
- **Dashboard**: Visualize todas as postagens existentes com opções de ação.
- **Criar Postagem**: Clique em "Nova Postagem" para preencher o formulário (Título, Autor, Resumo, Conteúdo).
- **Editar/Excluir**: Utilize os ícones de lápis e lixeira no dashboard para gerenciar o conteúdo.

---
Desenvolvido por Equipe Tech Challenge - FIAP 2026.
