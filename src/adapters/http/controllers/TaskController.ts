import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateTaskDTO } from '@/core/dtos/TaskDTO'
import { ITaskService } from '@/core/services/TaskService'

export class TaskController {
  constructor(private taskService: ITaskService) {}

  async createTask(request: FastifyRequest, reply: FastifyReply) {
    const { title, dueDate, userId } = request.body as CreateTaskDTO
    const task = await this.taskService.createTask({ title, dueDate, userId })
    reply.status(201).send(task)
  }

  async getTaskById(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }
    const task = await this.taskService.getTaskById(taskId)
    reply.send(task)
  }

  async getTasksByUserId(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string }
    const tasks = await this.taskService.getTasksByUserId(userId)
    reply.send(tasks)
  }

  async updateTask(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }
    const { title, dueDate } = request.body as {
      title: string
      dueDate: Date
    }

    const task = await this.taskService.updateTask(taskId, {
      title,
      dueDate,
    })

    reply.send(task)
  }

  async completeTask(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }
    const task = await this.taskService.completeTask(taskId)
    reply.send(task)
  }

  async deleteTask(request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as { taskId: string }
    await this.taskService.deleteTask(taskId)
    reply.send()
  }
}
