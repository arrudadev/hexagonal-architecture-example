export interface INotifyTaskUseCase {
  execute(taskId: string): Promise<void>
}
