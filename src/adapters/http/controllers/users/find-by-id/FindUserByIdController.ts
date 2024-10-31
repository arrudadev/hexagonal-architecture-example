import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { FindUserByIdUseCase } from '@/core/usecases/users/find-by-id/FindUserByIdUseCase'

const userRepository = new UserRepository(db)
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository)

export class FindUserByIdController {
  static async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<void> {
    const { userId } = request.params as { userId: string }
    const user = await findUserByIdUseCase.execute(userId)
    response.send(user)
  }
}
