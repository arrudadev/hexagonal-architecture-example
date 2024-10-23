import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { usersTable } from './users'

export const tasksTable = pgTable('tasks', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull(),
  dueDate: timestamp('due_date').notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),
})
