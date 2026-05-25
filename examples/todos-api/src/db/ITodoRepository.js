// Domain layer - Repository Interface
// Follows backend-db-pattern Step 2

interface ITodoRepository {
  /**
   * Create a new todo
   */
  create(todoData: CreateTodoDto): Promise<Todo>;

  /**
   * Find todos by user ID with optional pagination
   */
  findByUserId(userId: string, options?: { limit?: number; offset?: number; completed?: boolean }): Promise<Todo[]>;

  /**
   * Find todo by ID and user ID (ownership check)
   */
  findById(id: string, userId: string): Promise<Todo | null>;

  /**
   * Update todo by ID (only if belongs to user)
   */
  update(id: string, userId: string, updates: Partial<UpdateTodoDto>): Promise<Todo | null>;

  /**
   * Delete todo by ID (only if belongs to user)
   */
  delete(id: string, userId: string): Promise<boolean>;
}

// DTOs for type safety
interface CreateTodoDto {
  title: string;
  description?: string | null;
  userId: string;
  completed?: boolean;
}

interface UpdateTodoDto {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export type { ITodoRepository, CreateTodoDto, UpdateTodoDto };
