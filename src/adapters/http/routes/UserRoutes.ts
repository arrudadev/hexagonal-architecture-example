import { FastifyInstance } from 'fastify'

import { FindTaskByUserIdController } from '../controllers/tasks/find-by-user-id/FindTaskByUserIdController'
import { CreateUserController } from '../controllers/users/create/CreateUserController'
import { DeleteUserController } from '../controllers/users/delete/DeleteUserController'
import { FindUserByIdController } from '../controllers/users/find-by-id/FindUserByIdController'
import { UpdateUserController } from '../controllers/users/update/UpdateUserController'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', CreateUserController.handle)
  fastify.get('/users/:userId', FindUserByIdController.handle)
  fastify.get('/users/:userId/tasks', FindTaskByUserIdController.handle)
  fastify.put('/users/:userId', UpdateUserController.handle)
  fastify.delete('/users/:userId', DeleteUserController.handle)
}
