import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { UpdateTaskUseCase } from '@/core/usecases/tasks/update/UpdateTaskUseCase'

const taskRepository = new TaskRepository(db)
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository)

export class UpdateTaskController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }
    const { title, dueDate } = request.body as {
      title: string
      dueDate: Date
    }

    await updateTaskUseCase.execute(taskId, { title, dueDate })

    reply.send()
  }
}
