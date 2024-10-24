import { eq } from 'drizzle-orm'

import { CreateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'
import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { DrizzleDb } from '../connection'
import { tasksTable, usersTable } from '../schemas'

export class TaskRepository implements ITaskRepository {
  constructor(private db: DrizzleDb) {}

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    const [task] = await this.db
      .insert(tasksTable)
      .values({
        title: dto.title,
        completed: false,
        dueDate: dto.dueDate,
        userId: dto.userId,
      })
      .returning()

    return task
  }

  async getTaskById(taskId: string): Promise<Task> {
    const [task] = await this.db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))

    return task
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.db
      .select({
        id: tasksTable.id,
        title: tasksTable.title,
        completed: tasksTable.completed,
        dueDate: tasksTable.dueDate,
        userId: tasksTable.userId,
      })
      .from(tasksTable)
      .innerJoin(usersTable, eq(tasksTable.userId, usersTable.id))
      .where(eq(usersTable.id, userId))

    return tasks
  }

  async updateTask(taskId: string, task: Partial<Task>): Promise<void> {
    await this.db.update(tasksTable).set(task).where(eq(tasksTable.id, taskId))
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.db.delete(tasksTable).where(eq(tasksTable.id, taskId))
  }
}
