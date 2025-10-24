import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "categories" ORDER BY "id"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET categories by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "categories" WHERE "id" = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'categories not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create categories
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const columns = ["name", "color", "created_at"];
    const values = [data.name, data.color, data.created_at];
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO "categories" (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update categories
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const setClause = Object.keys(data)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(', ');

    const values = [...Object.values(data), id];

    const query = `UPDATE "categories" SET ${setClause} WHERE "id" = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'categories not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE categories
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM "categories" WHERE "id" = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'categories not found' });
    }

    res.json({ message: 'categories deleted successfully' });
  } catch (error) {
    console.error('Error deleting categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
