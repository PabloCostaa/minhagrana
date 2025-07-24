# 💰 MinhaGrana

Aplicativo PWA para controle de despesas pessoais. Possui frontend com Vite + Tailwind e backend com Node.js + PostgreSQL.

## 📦 Estrutura
- **Frontend**: Vite, React, Tailwind
- **Backend**: Node.js, Express, PostgreSQL
- **Banco**: Tabelas `users`, `expenses`, `categories`

## 🚀 Execução

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Banco
Veja `sql/schema.sql` para estrutura inicial no PostgreSQL.

## 🐳 Deploy com Docker Swarm
```bash
docker stack deploy -c minhagrana.yaml minhagrana
```