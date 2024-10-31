export interface IDeleteUserUseCase {
  execute(userId: string): Promise<void>
}
