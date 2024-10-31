import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { DeleteUserUseCase } from '@/core/usecases/users/delete/DeleteUserUseCase'

const userRepository = new UserRepository(db)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)

export class DeleteUserController {
  static async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<void> {
    const { userId } = request.params as { userId: string }
    await deleteUserUseCase.execute(userId)
    response.status(204).send()
  }
}
