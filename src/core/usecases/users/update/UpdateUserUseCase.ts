import { UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'

import { IUpdateUserUseCase } from './IUpdateUserUseCase'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, inputDTO: UpdateUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    return this.userRepository.updateUser(userId, inputDTO)
  }
}
