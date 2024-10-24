import { CreateTaskDTO, UpdateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'
import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'

import { IScheduler } from '../ports/schedulers/Scheduler'

export interface ITaskService {
  createTask(task: CreateTaskDTO): Promise<Task>
  getTaskById(taskId: string): Promise<Task>
  getTasksByUserId(userId: string): Promise<Task[]>
  updateTask(taskId: string, task: UpdateTaskDTO): Promise<Task>
  completeTask(taskId: string): Promise<Task>
  deleteTask(taskId: string): Promise<void>
}

export class TaskService implements ITaskService {
  constructor(
    private taskRepository: ITaskRepository,
    private taskScheduler: IScheduler,
  ) {}

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.createTask({
      title: dto.title,
      dueDate: new Date(dto.dueDate),
      userId: dto.userId,
    })

    await this.taskScheduler.scheduleTaskNotification(task)

    return task
  }

  async getTaskById(taskId: string): Promise<Task> {
    return this.taskRepository.getTaskById(taskId)
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByUserId(userId)
  }

  async updateTask(taskId: string, task: UpdateTaskDTO): Promise<Task> {
    return this.taskRepository.updateTask(taskId, {
      title: task.title,
      dueDate: new Date(task.dueDate),
    })
  }

  async completeTask(taskId: string): Promise<Task> {
    return this.taskRepository.completeTask(taskId)
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.taskRepository.deleteTask(taskId)
  }
}
