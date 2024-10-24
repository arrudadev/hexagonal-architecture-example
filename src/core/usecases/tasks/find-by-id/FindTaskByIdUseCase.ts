import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { IFindTaskByIdUseCase } from './IFindTaskByIdUseCase'

export class FindTaskByIdUseCase implements IFindTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string) {
    return this.taskRepository.getTaskById(taskId)
  }
}
