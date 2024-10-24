import { CreateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'

export interface ICreateTaskUseCase {
  execute(inputDTO: CreateTaskDTO): Promise<Task>
}
