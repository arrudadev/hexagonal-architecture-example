import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'

export interface IUserService {
  createUser(user: CreateUserDTO): Promise<UserDTO>
  getUserById(userId: string): Promise<UserDTO>
  getUserByEmail(email: string): Promise<UserDTO>
  updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO>
  deleteUser(userId: string): Promise<void>
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(user: CreateUserDTO): Promise<UserDTO> {
    return this.userRepository.createUser(user)
  }

  async getUserById(userId: string): Promise<UserDTO> {
    return this.userRepository.getUserById(userId)
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    return this.userRepository.getUserByEmail(email)
  }

  async updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    return this.userRepository.updateUser(userId, user)
  }

  async deleteUser(userId: string): Promise<void> {
    return this.userRepository.deleteUser(userId)
  }
}
