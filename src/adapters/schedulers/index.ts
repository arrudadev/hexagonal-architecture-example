import { agenda } from './config'
import { startTaskScheduler } from './tasks'

export const startSchedulers = async () => {
  startTaskScheduler()

  await agenda.start()
}
