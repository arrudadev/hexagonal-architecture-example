import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateUserDTO, UpdateUserDTO } from '@/core/dtos/UserDTO'
import { IUserService } from '@/core/services/UserService'

export class UserController {
  constructor(private userService: IUserService) {}

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as CreateUserDTO
    const user = await this.userService.createUser({ name, email })
    reply.status(201).send(user)
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string }
    const user = await this.userService.getUserById(userId)
    reply.send(user)
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string }
    const { name, email } = request.body as UpdateUserDTO

    const user = await this.userService.updateUser(userId, {
      name,
      email,
    })

    reply.send(user)
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string }
    await this.userService.deleteUser(userId)
    reply.send()
  }
}
