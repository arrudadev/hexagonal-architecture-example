import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { DeleteTaskUseCase } from '@/core/usecases/tasks/delete/DeleteTaskUseCase'

const taskRepository = new TaskRepository(db)
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)

export class DeleteTaskController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }

    await deleteTaskUseCase.execute(taskId)

    reply.send()
  }
}
