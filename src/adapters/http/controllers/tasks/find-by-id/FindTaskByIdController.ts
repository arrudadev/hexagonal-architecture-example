import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { FindTaskByIdUseCase } from '@/core/usecases/tasks/find-by-id/FindTaskByIdUseCase'

const taskRepository = new TaskRepository(db)
const findTaskByIdUseCase = new FindTaskByIdUseCase(taskRepository)

export class FindTaskByIdController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }

    const task = await findTaskByIdUseCase.execute(taskId)

    reply.send(task)
  }
}
