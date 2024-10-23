export class Task {
  id: string
  title: string
  completed: boolean
  dueDate: Date
  userId: string

  constructor(
    id: string,
    title: string,
    completed: boolean,
    dueDate: Date,
    userId: string,
  ) {
    this.id = id
    this.title = title
    this.completed = completed
    this.dueDate = dueDate
    this.userId = userId
  }
}
