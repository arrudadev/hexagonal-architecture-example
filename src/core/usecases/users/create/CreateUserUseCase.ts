import { CreateUserDTO, UserDTO } from '@/core/dtos/UserDTO'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'

import { ICreateUserUseCase } from './ICreateUserUseCase'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(inputDTO: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.getUserByEmail(inputDTO.email)
    if (user) {
      throw new Error('User already exists')
    }

    return this.userRepository.createUser(inputDTO)
  }
}
