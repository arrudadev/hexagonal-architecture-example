import { FastifyInstance } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { TaskService } from '@/core/services/TaskService'

import { TaskController } from '../controllers/TaskController'

const taskRepository = new TaskRepository(db)
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    return taskController.completeTask(request, reply)
  })

  fastify.get('/users/:taskId', async (request, reply) => {
    return taskController.getTaskById(request, reply)
  })

  fastify.put('/users/:taskId', async (request, reply) => {
    return taskController.updateTask(request, reply)
  })

  fastify.patch('/users/:taskId/complete', async (request, reply) => {
    return taskController.completeTask(request, reply)
  })

  fastify.delete('/users/:taskId', async (request, reply) => {
    return taskController.deleteTask(request, reply)
  })
}
