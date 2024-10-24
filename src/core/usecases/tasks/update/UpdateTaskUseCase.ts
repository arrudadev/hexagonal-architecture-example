import { Task } from '@/core/entities/Task'
import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { IUpdateTaskUseCase } from './IUpdateTaskUseCase'

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string, task: Partial<Task>): Promise<void> {
    const taskExists = await this.taskRepository.getTaskById(taskId)
    if (!taskExists) {
      throw new Error('Task not found')
    }

    await this.taskRepository.updateTask(taskId, task)
  }
}
