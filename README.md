# Pontos Turísticos - Frontend

Frontend em React com TypeScript para gerenciamento de pontos turísticos.

## 🚀 Tecnologias

- React 18
- TypeScript
- React Router DOM
- Axios
- CSS

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

## ⚙️ Configuração da API

Antes de executar o projeto, verifique a URL da API no arquivo [src/api/pontosTuristicosApi.ts](src/api/pontosTuristicosApi.ts):

```typescript
const API_BASE_URL = 'https://localhost:7094/api';
```

Ajuste a URL conforme necessário para corresponder ao endereço da sua API ASP.NET Core.

## 🎯 Executar o Projeto

```bash
npm start
```

O aplicativo será aberto em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Comunicação com a API
│   └── pontosTuristicosApi.ts
├── components/             # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ListaResultados.tsx
│   ├── ItemResultado.tsx
│   └── FormularioPonto.tsx
├── pages/                  # Páginas da aplicação
│   ├── Pesquisa.tsx
│   └── Cadastro.tsx
├── types/                  # Tipos TypeScript
│   └── PontoTuristico.ts
├── App.tsx                 # Componente principal
└── index.tsx              # Ponto de entrada
```

## 🎨 Funcionalidades

### Tela de Pesquisa
- Campo de busca por nome, cidade ou estado
- Listagem de pontos turísticos ordenados por data de inclusão
- Navegação para cadastro

### Tela de Cadastro
- Formulário completo com validação
- Campos: Nome, Cidade, Estado, Referência, Descrição
- Retorno automático para pesquisa após cadastro

## 🌐 Endpoints da API

- `GET /api/PontosTuristicos?termo=` - Buscar pontos turísticos
- `POST /api/PontosTuristicos` - Cadastrar novo ponto turístico

## 📝 Notas

- A aplicação não utiliza bibliotecas de gerenciamento de estado como Redux
- O código foi desenvolvido seguindo boas práticas para desenvolvedores júnior
- CSS simples e funcional, focado na usabilidade
