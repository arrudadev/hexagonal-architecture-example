import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { CreateUserDTO } from '@/core/dtos/UserDTO'
import { CreateUserUseCase } from '@/core/usecases/users/create/CreateUserUseCase'

const userRepository = new UserRepository(db)
const createUserUseCase = new CreateUserUseCase(userRepository)

export class CreateUserController {
  static async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<void> {
    const { name, email } = request.body as CreateUserDTO
    const user = await createUserUseCase.execute({ name, email })
    response.status(201).send(user)
  }
}
