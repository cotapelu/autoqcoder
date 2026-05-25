// Application layer - Todo Service
// Injects Repository Interface (KHÔNG inject dbPool trực tiếp)

const { TodoRepository } = require('./TodoRepository');

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async createTodo(userId, title, description = null) {
    // Input validation
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Title is required and must be non-empty string');
    }
    if (title.length > 200) {
      throw new Error('Title too long (max 200 characters)');
    }
    if (description && description.length > 1000) {
      throw new Error('Description too long (max 1000 characters)');
    }

    // Business logic
    const trimmedTitle = title.trim();
    const trimmedDescription = description ? description.trim() || null : null;

    return await this.todoRepository.create({
      title: trimmedTitle,
      description: trimmedDescription,
      userId,
      completed: false
    });
  }

  async getTodos(userId, options = {}) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    const { limit = 50, offset = 0, completed } = options;

    // Validate limit
    const limitNum = parseInt(limit);
    if (isNaN(limitNum)) {
      throw new Error('Limit must be a number');
    }
    if (limitNum < 1 || limitNum > 100) {
      throw new Error('Limit must be between 1 and 100');
    }

    // Validate offset
    const offsetNum = parseInt(offset);
    if (isNaN(offsetNum) || offsetNum < 0) {
      throw new Error('Offset must be a non-negative number');
    }

    return await this.todoRepository.findByUserId(userId, {
      limit: limitNum,
      offset: offsetNum,
      completed
    });
  }

  async getTodo(todoId, userId) {
    if (!todoId || typeof todoId !== 'string') {
      throw new Error('Invalid todo ID');
    }
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    return await this.todoRepository.findById(todoId, userId);
  }

  async updateTodo(todoId, userId, updates) {
    if (!todoId || typeof todoId !== 'string') {
      throw new Error('Invalid todo ID');
    }
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    // Validate updates
    const allowedUpdates = { title: typeof updates.title, description: typeof updates.description, completed: typeof updates.completed };
    const updateEntries = Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null);
    if (updateEntries.length === 0) {
      throw new Error('No valid fields to update');
    }

    // Business rule: completed can only be boolean
    if (updates.completed !== undefined && typeof updates.completed !== 'boolean') {
      throw new Error('Completed must be a boolean');
    }

    // Business rule: title cannot be empty
    if (updates.title !== undefined && typeof updates.title === 'string' && updates.title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }

    return await this.todoRepository.update(todoId, userId, updates);
  }

  async deleteTodo(todoId, userId) {
    if (!todoId || typeof todoId !== 'string') {
      throw new Error('Invalid todo ID');
    }
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    return await this.todoRepository.delete(todoId, userId);
  }
}

module.exports = { TodoService };
