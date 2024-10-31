import { IUserRepository } from '@/core/ports/repositories/UserRepository'

import { IDeleteUserUseCase } from './IDeleteUserUseCase'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId)
  }
}
