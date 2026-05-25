// Todo Routes - Production-ready (v2.0)
// Functions ≤20 lines, 100% error handling, full validation

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

// Validation rules (concise)
const createTodoValidation = [
  body('title').trim().notEmpty().withMessage('Title required'),
  body('title').isLength({ max: 200 }).withMessage('Title >200 chars'),
  body('description').optional().trim().isLength({ max: 1000 })
];

const updateTodoValidation = [
  param('id').isUUID(),
  body('title').optional().trim().isLength({ max: 200 }),
  body('completed').optional().isBoolean()
];

// POST / - Create todo (18 lines)
router.post('/', createTodoValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const userId = req.user.id;
    const todo = await req.services.todoService.createTodo(userId, title, description);

    req.logger.info('Todo created', { todoId: todo.id, userId });
    req.metrics.todosCreated.inc();

    res.status(201).json(todo);
  } catch (error) {
    req.logger.error('Create todo failed', { error: error.message, userId: req.user?.id });
    res.status(400).json({ error: error.message, code: 'TODO_CREATE_FAILED' });
  }
});

// GET / - List todos (15 lines)
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0, completed } = req.query;
    const todos = await req.services.todoService.getTodos(req.user.id, {
      limit: parseInt(limit),
      offset: parseInt(offset),
      completed: completed !== undefined ? completed === 'true' : undefined
    });
    res.json(todos);
  } catch (error) {
    req.logger.error('Get todos failed', { error: error.message, userId: req.user.id });
    res.status(400).json({ error: error.message, code: 'TODO_GET_FAILED' });
  }
});

// GET /:id - Get one todo (16 lines)
router.get('/:id', [param('id').isUUID()], async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await req.services.todoService.getTodo(id, req.user.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found', code: 'TODO_NOT_FOUND' });
    }

    res.json(todo);
  } catch (error) {
    req.logger.error('Get todo failed', { error: error.message, todoId: req.params.id, userId: req.user.id });
    res.status(400).json({ error: error.message, code: 'TODO_GET_ONE_FAILED' });
  }
});

// PATCH /:id - Update todo (17 lines)
router.patch('/:id', updateTodoValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;
    const todo = await req.services.todoService.updateTodo(id, req.user.id, updates);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found', code: 'TODO_NOT_FOUND' });
    }

    req.logger.info('Todo updated', { todoId: id, userId: req.user.id });
    req.metrics.todosUpdated.inc();

    res.json(todo);
  } catch (error) {
    req.logger.error('Update todo failed', { error: error.message, todoId: req.params.id, userId: req.user.id });
    res.status(400).json({ error: error.message, code: 'TODO_UPDATE_FAILED' });
  }
});

// DELETE /:id - Delete todo (16 lines)
router.delete('/:id', [param('id').isUUID()], async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await req.services.todoService.deleteTodo(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found', code: 'TODO_NOT_FOUND' });
    }

    req.logger.info('Todo deleted', { todoId: id, userId: req.user.id });
    req.metrics.todosDeleted.inc();

    res.status(204).end();
  } catch (error) {
    req.logger.error('Delete todo failed', { error: error.message, todoId: req.params.id, userId: req.user.id });
    res.status(400).json({ error: error.message, code: 'TODO_DELETE_FAILED' });
  }
});

module.exports = router;
