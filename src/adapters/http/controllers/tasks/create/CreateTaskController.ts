import { FastifyReply, FastifyRequest } from 'fastify'

import { db } from '@/adapters/database/connection'
import { TaskRepository } from '@/adapters/database/repositories/TaskRepository'
import { taskScheduler } from '@/adapters/schedulers/tasks'
import { CreateTaskDTO } from '@/core/dtos/TaskDTO'
import { CreateTaskUseCase } from '@/core/usecases/tasks/create/CreateTaskUseCase'

const taskRepository = new TaskRepository(db)
const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskScheduler)

export class CreateTaskController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, dueDate, userId } = request.body as CreateTaskDTO

    const task = await createTaskUseCase.execute({ title, dueDate, userId })

    reply.status(201).send(task)
  }
}
