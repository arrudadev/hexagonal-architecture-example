import { UserDTO } from '@/core/dtos/UserDTO'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'

import { IFindUserByIdUseCase } from './IFindUserByIdUseCase'

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
