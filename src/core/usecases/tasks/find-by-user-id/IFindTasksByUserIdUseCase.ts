import { Task } from '@/core/entities/Task'

export interface IFindTasksByUserIdUseCase {
  execute(userId: string): Promise<Task[]>
}
