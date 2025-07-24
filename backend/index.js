const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Middleware para autenticação futura (JWT etc.)
app.use((req, res, next) => {
  req.user_id = req.headers['x-user-id'] || null; // Simulação
  next();
});

// Rotas de despesas
app.get('/expenses', async (req, res) => {
  const user_id = req.user_id;
  const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC', [user_id]);
  res.json(result.rows);
});

app.post('/expenses', async (req, res) => {
  const { name, amount, date, category, recurrence, notes } = req.body;
  const result = await pool.query(
    'INSERT INTO expenses (user_id, name, amount, date, category, recurrence, notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [req.user_id, name, amount, date, category, recurrence || 'none', notes]
  );
  res.status(201).json(result.rows[0]);
});

// Categorias
app.get('/categories', async (req, res) => {
  const result = await pool.query('SELECT * FROM categories WHERE user_id = $1', [req.user_id]);
  res.json(result.rows);
});

app.post('/categories', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'INSERT INTO categories (user_id, name) VALUES ($1,$2) RETURNING *',
    [req.user_id, name]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`API backend running at http://localhost:${port}`);
});