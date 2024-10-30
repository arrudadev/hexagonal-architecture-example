import { Task } from '@/core/entities/Task'
import { TaskJobEnum } from '@/core/enums/TaskJobEnum'
import { ITaskScheduler } from '@/core/ports/schedulers/TaskScheduler'

import { AgendaScheduler } from '../config'

export class TaskScheduler implements ITaskScheduler {
  constructor(private agenda: AgendaScheduler) {}

  async scheduleTaskNotification(task: Task): Promise<void> {
    await this.agenda.schedule(
      new Date(task.dueDate),
      TaskJobEnum.TASK_NOTIFICATION_JOB,
      {
        task,
      },
    )
  }
}
