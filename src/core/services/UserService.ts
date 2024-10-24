import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'

export interface IUserService {
  createUser(user: CreateUserDTO): Promise<UserDTO>
  getUserById(userId: string): Promise<UserDTO | null>
  getUserByEmail(email: string): Promise<UserDTO | null>
  updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO>
  deleteUser(userId: string): Promise<void>
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(dto: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.getUserByEmail(dto.email)
    if (user) {
      throw new Error('User already exists')
    }

    return this.userRepository.createUser({
      name: dto.name,
      email: dto.email,
    })
  }

  async getUserById(userId: string): Promise<UserDTO | null> {
    return this.userRepository.getUserById(userId)
  }

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    return this.userRepository.getUserByEmail(email)
  }

  async updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    return this.userRepository.updateUser(userId, user)
  }

  async deleteUser(userId: string): Promise<void> {
    return this.userRepository.deleteUser(userId)
  }
}
