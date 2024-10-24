import { Task } from '@/core/entities/Task'

export interface IFindTaskByIdUseCase {
  execute(taskId: string): Promise<Task>
}
