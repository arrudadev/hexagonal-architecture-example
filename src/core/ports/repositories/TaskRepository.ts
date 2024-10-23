import { CreateTaskDTO, UpdateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'

export interface ITaskRepository {
  createTask(task: CreateTaskDTO): Promise<Task>
  getTaskById(taskId: string): Promise<Task>
  getTasksByUserId(userId: string): Promise<Task[]>
  updateTask(taskId: string, task: UpdateTaskDTO): Promise<Task>
  completeTask(taskId: string): Promise<Task>
  deleteTask(taskId: string): Promise<void>
}
