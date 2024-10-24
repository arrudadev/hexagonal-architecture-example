import { FastifyInstance } from 'fastify'

import { db } from '@/adapters/database/connection'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { UserService } from '@/core/services/UserService'

import { UserController } from '../controllers/UserController'

const userRepository = new UserRepository(db)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    return userController.createUser(request, reply)
  })

  fastify.get('/users/:userId', async (request, reply) => {
    return userController.getUserById(request, reply)
  })

  fastify.put('/users/:userId', async (request, reply) => {
    return userController.updateUser(request, reply)
  })

  fastify.delete('/users/:userId', async (request, reply) => {
    return userController.deleteUser(request, reply)
  })
}
