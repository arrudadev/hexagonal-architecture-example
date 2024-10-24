import Fastify from 'fastify'

import { env } from '@/adapters/env'

import { scheduler } from '../scheduler'
import { taskRoutes } from './routes/TaskRoutes'
import { userRoutes } from './routes/UserRoutes'

const fastify = Fastify({
  logger: true,
})

fastify.register(userRoutes)
fastify.register(taskRoutes)

export const startServer = async () => {
  try {
    await scheduler.start()
    await fastify.listen({ port: env.PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
