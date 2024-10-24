export interface ICompleteTaskUseCase {
  execute(taskId: string): Promise<void>
}
