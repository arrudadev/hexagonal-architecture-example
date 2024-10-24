import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { ICompleteTaskUseCase } from './ICompleteTaskUseCase'

export class CompleteTaskUseCase implements ICompleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    const task = await this.taskRepository.getTaskById(taskId)
    if (!task) {
      throw new Error('Task not found')
    }

    if (task.completed) {
      throw new Error('Task is already completed')
    }

    task.completed = true
    await this.taskRepository.updateTask(taskId, task)
  }
}
