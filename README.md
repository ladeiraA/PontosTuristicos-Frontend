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

### Modo de Desenvolvimento

```bash
npm start
```

O aplicativo será aberto em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
```

Cria a versão otimizada para produção na pasta `build/`

### Executar Testes

```bash
npm test
```

Executa os testes no modo interativo

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

- `GET /api/PontosTuristicos?termo={termo}` - Buscar pontos turísticos (termo opcional)
- `POST /api/PontosTuristicos` - Cadastrar novo ponto turístico
- `PUT /api/PontosTuristicos/{id}` - Atualizar ponto turístico existente
- `DELETE /api/PontosTuristicos/{id}` - Excluir ponto turístico

## 🔍 Scripts Disponíveis

- `npm start` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm test` - Executa testes
- `npm run eject` - Remove a abstração do Create React App (irreversível)

## 🛠️ Tecnologias e Versões

- **React**: 18.2.0
- **TypeScript**: 5.3.3
- **React Router DOM**: 6.20.0
- **Axios**: 1.6.2
- **React Scripts**: 5.0.1

## 📦 Build e Deploy

Após executar `npm run build`, os arquivos otimizados estarão na pasta `build/`. Estes arquivos podem ser servidos por qualquer servidor HTTP estático.

## 🔒 Requisitos do Backend

Este frontend requer uma API ASP.NET Core em execução. Certifique-se de que:
- A API está rodando no endereço configurado em `pontosTuristicosApi.ts`
- CORS está configurado no backend para aceitar requisições do frontend
- Certificado SSL está configurado (se usando HTTPS)

## 🐛 Troubleshooting

### Erro de CORS
Se encontrar erros de CORS, verifique a configuração do backend para permitir requisições do `http://localhost:3000`

### Erro de conexão com a API
Verifique se:
1. A API está em execução
2. A URL em `pontosTuristicosApi.ts` está correta
3. Não há firewall bloqueando a conexão
