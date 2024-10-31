import { UserDTO } from '@/core/dtos/UserDTO'

export interface IFindUserByIdUseCase {
  execute(userId: string): Promise<UserDTO>
}
