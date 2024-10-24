import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { CompleteTaskUseCase } from '@/core/usecases/tasks/complete/CompleteTaskUseCase'

const taskRepository = new TaskRepository(db)
const completeTaskUseCase = new CompleteTaskUseCase(taskRepository)

export class CompleteTaskController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }

    await completeTaskUseCase.execute(taskId)

    reply.send()
  }
}
