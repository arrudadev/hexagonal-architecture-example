import { Job } from 'agenda'

import { Task } from '@/core/entities/Task'
import { IScheduler } from '@/core/ports/schedulers/Scheduler'

import { AgendaScheduler } from './config'

export class Scheduler implements IScheduler {
  TASK_NOTIFICATION_JOB_NAME = 'TASK_NOTIFICATION_JOB'

  constructor(private agenda: AgendaScheduler) {}

  createTaskNotificationJob() {
    this.agenda.define(this.TASK_NOTIFICATION_JOB_NAME, async (job: Job) => {
      const { task } = job.attrs.data as { task: Task }
      console.log(task)
    })
  }

  async scheduleTaskNotification(task: Task): Promise<void> {
    this.agenda.schedule(
      new Date(task.dueDate),
      this.TASK_NOTIFICATION_JOB_NAME,
      {
        task,
      },
    )
  }

  async start() {
    this.createTaskNotificationJob()
    await this.agenda.start()
  }
}
