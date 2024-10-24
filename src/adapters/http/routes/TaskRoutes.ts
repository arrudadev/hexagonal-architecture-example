import { FastifyInstance } from 'fastify'

import { CompleteTaskController } from '../controllers/tasks/complete/CompleteTaskController'
import { CreateTaskController } from '../controllers/tasks/create/CreateTaskController'
import { DeleteTaskController } from '../controllers/tasks/delete/DeleteTaskController'
import { FindTaskByIdController } from '../controllers/tasks/find-by-id/FindTaskByIdController'
import { UpdateTaskController } from '../controllers/tasks/update/UpdateTaskController'

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/tasks', CreateTaskController.handle)
  fastify.get('/tasks/:taskId', FindTaskByIdController.handle)
  fastify.put('/tasks/:taskId', UpdateTaskController.handle)
  fastify.patch('/tasks/:taskId/complete', CompleteTaskController.handle)
  fastify.delete('/tasks/:taskId', DeleteTaskController.handle)
}
