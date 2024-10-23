import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'

export interface IUserRepository {
  createUser(user: CreateUserDTO): Promise<UserDTO>
  getUserById(userId: string): Promise<UserDTO>
  getUserByEmail(email: string): Promise<UserDTO>
  updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO>
  updatePassword(userId: string, password: string): Promise<void>
  deleteUser(userId: string): Promise<void>
}
