export interface IDeleteTaskUseCase {
  execute(taskId: string): Promise<void>
}
