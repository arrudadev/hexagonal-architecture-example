import { CreateTaskDTO } from '@/core/dtos/TaskDTO'
import { Task } from '@/core/entities/Task'
import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'
import { ITaskScheduler } from '@/core/ports/schedulers/TaskScheduler'

import { ICreateTaskUseCase } from './ICreateTaskUseCase'

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private taskScheduler: ITaskScheduler,
  ) {}

  async execute(inputDTO: CreateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.createTask({
      title: inputDTO.title,
      dueDate: new Date(inputDTO.dueDate),
      userId: inputDTO.userId,
    })

    await this.taskScheduler.scheduleTaskNotification(task)

    return task
  }
}
