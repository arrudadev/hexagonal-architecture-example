import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'

export interface IUserRepository {
  createUser(user: CreateUserDTO): Promise<UserDTO>
  getUserById(userId: string): Promise<UserDTO>
  getUserByEmail(email: string): Promise<UserDTO>
  updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO>
  deleteUser(userId: string): Promise<void>
}
