import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { IDeleteTaskUseCase } from './IDeleteTaskUseCase'

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    const task = await this.taskRepository.getTaskById(taskId)
    if (!task) {
      throw new Error('Task not found')
    }

    await this.taskRepository.deleteTask(taskId)
  }
}
