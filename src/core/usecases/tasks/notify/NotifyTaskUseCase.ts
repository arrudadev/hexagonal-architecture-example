import { ITaskRepository } from '@/core/ports/repositories/TaskRepository'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'
import { IEmailService } from '@/core/ports/services/EmailService'

import { INotifyTaskUseCase } from './INotifyTaskUseCase'

export class NotifyTaskUseCase implements INotifyTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository,
    private emailService: IEmailService,
  ) {}

  async execute(taskId: string) {
    const task = await this.taskRepository.getTaskById(taskId)
    if (!task) {
      throw new Error('Task not found')
    }

    const user = await this.userRepository.getUserById(task.userId)
    if (!user) {
      throw new Error('User not found')
    }

    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Task Notification',
      message: `It's time to do the task: ${task.title}`,
    })
  }
}
