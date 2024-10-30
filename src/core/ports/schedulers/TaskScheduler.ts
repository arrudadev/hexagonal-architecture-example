import { Task } from '@/core/entities/Task'

export interface ITaskScheduler {
  scheduleTaskNotification(task: Task): Promise<void>
}
