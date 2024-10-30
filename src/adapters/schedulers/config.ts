import Agenda from 'agenda'

import { env } from '../env'

export const agenda = new Agenda({
  db: {
    address: env.MONGO_DB_URL,
  },
})
export type AgendaScheduler = typeof agenda
