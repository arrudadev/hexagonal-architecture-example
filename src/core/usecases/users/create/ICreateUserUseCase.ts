import { CreateUserDTO, UserDTO } from '@/core/dtos/UserDTO'

export interface ICreateUserUseCase {
  execute(inputDTO: CreateUserDTO): Promise<UserDTO>
}
