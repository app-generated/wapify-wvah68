import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "tasks" ORDER BY "id"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET tasks by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "tasks" WHERE "id" = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'tasks not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create tasks
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const columns = ["title", "description", "completed", "priority", "category", "due_date", "created_at", "updated_at"];
    const values = [data.title, data.description, data.completed, data.priority, data.category, data.due_date, data.created_at, data.updated_at];
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO "tasks" (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update tasks
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const setClause = Object.keys(data)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(', ');

    const values = [...Object.values(data), id];

    const query = `UPDATE "tasks" SET ${setClause} WHERE "id" = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'tasks not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE tasks
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM "tasks" WHERE "id" = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'tasks not found' });
    }

    res.json({ message: 'tasks deleted successfully' });
  } catch (error) {
    console.error('Error deleting tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
