// Infrastructure layer - Todo Repository Implementation
// Follows backend-db-pattern Step 3

const { Pool } = require('pg');
const { ITodoRepository, Todo, CreateTodoDto, UpdateTodoDto } = require('./ITodoRepository');

class TodoRepository implements ITodoRepository {
  constructor(dbPool) {
    this.dbPool = dbPool;
  }

  async create(todoData) {
    const { title, description, userId, completed = false } = todoData;
    const query = `
      INSERT INTO todos (user_id, title, description, completed)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, title, description, completed, created_at, updated_at
    `;
    const values = [userId, title, description || null, completed];
    const result = await this.dbPool.query(query, values);
    return result.rows[0];
  }

  async findByUserId(userId, options = {}) {
    const { limit = 50, offset = 0, completed } = options;
    let query = 'SELECT * FROM todos WHERE user_id = $1';
    const values = [userId];

    if (completed !== undefined) {
      query += ' AND completed = $2';
      values.push(completed);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (values.length + 1) + ' OFFSET $' + (values.length + 2);
    values.push(limit, offset);

    const result = await this.dbPool.query(query, values);
    return result.rows;
  }

  async findById(id, userId) {
    const query = 'SELECT * FROM todos WHERE id = $1 AND user_id = $2';
    const result = await this.dbPool.query(query, [id, userId]);
    return result.rows[0] || null;
  }

  async update(id, userId, updates) {
    const setClause = [];
    const values = [];

    if (updates.title !== undefined) {
      setClause.push(`title = $${values.length + 1}`);
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      setClause.push(`description = $${values.length + 1}`);
      values.push(updates.description);
    }
    if (updates.completed !== undefined) {
      setClause.push(`completed = $${values.length + 1}`);
      values.push(updates.completed);
    }

    if (setClause.length === 0) {
      return this.findById(id, userId);
    }

    setClause.push(`updated_at = NOW()`);
    values.push(id, userId);

    const query = `
      UPDATE todos
      SET ${setClause.join(', ')}
      WHERE id = $${values.length - 1} AND user_id = $${values.length}
      RETURNING id, user_id, title, description, completed, created_at, updated_at
    `;

    const result = await this.dbPool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id, userId) {
    const query = 'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id';
    const result = await this.dbPool.query(query, [id, userId]);
    return result.rowCount > 0;
  }
}

module.exports = { TodoRepository };
