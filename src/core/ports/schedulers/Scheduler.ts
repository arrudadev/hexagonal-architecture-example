import { Task } from '@/core/entities/Task'

export interface IScheduler {
  scheduleTaskNotification(task: Task): Promise<void>
}
