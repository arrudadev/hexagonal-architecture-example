import { UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'

export interface IUpdateUserUseCase {
  execute(userId: string, inputDTO: UpdateUserDTO): Promise<UserDTO>
}
