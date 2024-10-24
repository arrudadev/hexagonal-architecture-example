import { FastifyInstance } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { scheduler } from '@/adapters/scheduler'
import { TaskService } from '@/core/services/TaskService'

import { TaskController } from '../controllers/TaskController'

const taskRepository = new TaskRepository(db)
const taskService = new TaskService(taskRepository, scheduler)
const taskController = new TaskController(taskService)

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/tasks', async (request, reply) => {
    return taskController.createTask(request, reply)
  })

  fastify.get('/tasks/:taskId', async (request, reply) => {
    return taskController.getTaskById(request, reply)
  })

  fastify.put('/tasks/:taskId', async (request, reply) => {
    return taskController.updateTask(request, reply)
  })

  fastify.patch('/tasks/:taskId/complete', async (request, reply) => {
    return taskController.completeTask(request, reply)
  })

  fastify.delete('/tasks/:taskId', async (request, reply) => {
    return taskController.deleteTask(request, reply)
  })
}
