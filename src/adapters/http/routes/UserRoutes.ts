import { FastifyInstance } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { UserRepository } from '@/adapters/database/repositories/UserRepository'
import { scheduler } from '@/adapters/scheduler'
import { TaskService } from '@/core/services/TaskService'
import { UserService } from '@/core/services/UserService'

import { TaskController } from '../controllers/TaskController'
import { UserController } from '../controllers/UserController'

const userRepository = new UserRepository(db)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const taskRepository = new TaskRepository(db)
const taskService = new TaskService(taskRepository, scheduler)
const taskController = new TaskController(taskService)

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    return userController.createUser(request, reply)
  })

  fastify.get('/users/:userId', async (request, reply) => {
    return userController.getUserById(request, reply)
  })

  fastify.get('/users/:userId/tasks', async (request, reply) => {
    return taskController.getTasksByUserId(request, reply)
  })

  fastify.put('/users/:userId', async (request, reply) => {
    return userController.updateUser(request, reply)
  })

  fastify.delete('/users/:userId', async (request, reply) => {
    return userController.deleteUser(request, reply)
  })
}
