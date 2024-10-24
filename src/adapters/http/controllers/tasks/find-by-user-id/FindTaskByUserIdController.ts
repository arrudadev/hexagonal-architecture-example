import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { FindTasksByUserIdUseCase } from '@/core/usecases/tasks/find-by-user-id/FindTasksByUserIdUseCase'

const taskRepository = new TaskRepository(db)
const findTasksByUserIdUseCase = new FindTasksByUserIdUseCase(taskRepository)

export class FindTaskByUserIdController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string }

    const tasks = await findTasksByUserIdUseCase.execute(userId)

    reply.send(tasks)
  }
}
