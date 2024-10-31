import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { UpdateUserDTO } from '@/core/dtos/UserDTO'
import { UpdateUserUseCase } from '@/core/usecases/users/update/UpdateUserUseCase'

const userRepository = new UserRepository(db)
const updateUserUseCase = new UpdateUserUseCase(userRepository)

export class UpdateUserController {
  static async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<void> {
    const { userId } = request.params as { userId: string }
    const { name, email } = request.body as UpdateUserDTO
    const user = await updateUserUseCase.execute(userId, { name, email })
    response.send(user)
  }
}
