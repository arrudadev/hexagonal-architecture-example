import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { IFindTasksByUserIdUseCase } from './IFindTasksByUserIdUseCase'

export class FindTasksByUserIdUseCase implements IFindTasksByUserIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string) {
    return this.taskRepository.getTasksByUserId(userId)
  }
}
