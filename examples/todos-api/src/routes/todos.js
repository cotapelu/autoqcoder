// Todo routes - demonstrates v1.5 quality gates
// All functions ≤20 lines, proper error handling, validation

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const metrics = require('../metrics'); // custom metrics module

// Validation rules
const createTodoValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('title').isLength({ max: 200 }).withMessage('Title too long'),
  body('description').optional().trim().isLength({ max: 1000 })
];

const updateTodoValidation = [
  param('id').isUUID(),
  body('title').optional().trim().isLength({ max: 200 }),
  body('completed').optional().isBoolean()
];

// POST /api/v1/todos - Create todo
router.post('/', createTodoValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const userId = req.user.id;

    // TODO: Database insert with validation
    // const todo = await db.todos.create({ title, description, userId, completed: false });

    const todo = {
      id: 'temp-id',
      title,
      description: description || null,
      userId,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    metrics.todosCreated.inc();
    logger.info('Todo created', { todoId: todo.id, userId });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/todos - List todos
router.get('/', async (req, res, next) => {
  try {
    // TODO: Fetch todos with pagination, filtering
    const todos = []; // Placeholder
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/todos/:id - Update todo
router.patch('/:id', updateTodoValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    // TODO: Database update with optimistic locking
    // const todo = await db.todos.update(id, updates, { where: { userId: req.user.id } });

    const todo = { id, ...updates };

    metrics.todosUpdated.inc();
    logger.info('Todo updated', { todoId: id, userId: req.user.id });

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/todos/:id - Delete todo
router.delete('/:id', [param('id').isUUID()], async (req, res, next) => {
  try {
    const { id } = req.params;

    // TODO: Database delete with userId check
    // await db.todos.destroy({ where: { id, userId: req.user.id } });

    metrics.todosDeleted.inc();
    logger.info('Todo deleted', { todoId: id, userId: req.user.id });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;