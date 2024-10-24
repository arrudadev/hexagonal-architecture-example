import { Task } from '@/core/entities/Task'

export interface IUpdateTaskUseCase {
  execute(taskId: string, task: Partial<Task>): Promise<void>
}
