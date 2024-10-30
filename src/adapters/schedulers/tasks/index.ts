import { Job } from 'agenda'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { EmailService } from '@/adapters/services/EmailService'
import { Task } from '@/core/entities/Task'
import { TaskJobEnum } from '@/core/enums/TaskJobEnum'
import { NotifyTaskUseCase } from '@/core/usecases/tasks/notify/NotifyTaskUseCase'

import { agenda } from '../config'
import { TaskScheduler } from './TaskScheduler'

const userRepository = new UserRepository(db)
const taskRepository = new TaskRepository(db)
const emailService = new EmailService()
const notifyTaskUseCase = new NotifyTaskUseCase(
  taskRepository,
  userRepository,
  emailService,
)

export const taskScheduler = new TaskScheduler(agenda)

export const startTaskScheduler = () => {
  agenda.define(TaskJobEnum.TASK_NOTIFICATION_JOB, async (job: Job) => {
    const { task } = job.attrs.data as { task: Task }
    await notifyTaskUseCase.execute(task.id)
  })
}
