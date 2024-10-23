import { eq } from 'drizzle-orm'

import { CreateTaskDTO, UpdateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'
import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { DrizzleDb } from '../connection'
import { tasksTable } from '../schemas'

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
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, userId))

    return tasks
  }

  async updateTask(taskId: string, task: UpdateTaskDTO): Promise<Task> {
    const [updatedTask] = await this.db
      .update(tasksTable)
      .set({
        title: task.title,
        dueDate: task.dueDate,
      })
      .where(eq(tasksTable.id, taskId))
      .returning()

    return updatedTask
  }

  async completeTask(taskId: string): Promise<Task> {
    const [completedTask] = await this.db
      .update(tasksTable)
      .set({
        completed: true,
      })
      .where(eq(tasksTable.id, taskId))
      .returning()

    return completedTask
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.db.delete(tasksTable).where(eq(tasksTable.id, taskId))
  }
}