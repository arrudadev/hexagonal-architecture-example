import { CreateTaskDTO, UpdateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'
import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

export interface ITaskService {
  createTask(task: CreateTaskDTO): Promise<Task>
  getTaskById(taskId: string): Promise<Task>
  getTasksByUserId(userId: string): Promise<Task[]>
  updateTask(taskId: string, task: UpdateTaskDTO): Promise<Task>
  completeTask(taskId: string): Promise<Task>
  deleteTask(taskId: string): Promise<void>
}

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(task: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(task)
  }

  async getTaskById(taskId: string): Promise<Task> {
    return this.taskRepository.getTaskById(taskId)
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByUserId(userId)
  }

  async updateTask(taskId: string, task: UpdateTaskDTO): Promise<Task> {
    return this.taskRepository.updateTask(taskId, task)
  }

  async completeTask(taskId: string): Promise<Task> {
    return this.taskRepository.completeTask(taskId)
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.taskRepository.deleteTask(taskId)
  }
}
