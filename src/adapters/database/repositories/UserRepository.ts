import { eq } from 'drizzle-orm'

import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@/core/dtos/UserDTO'
import { User } from '@/core/entities/User'
import { IUserRepository } from '@/core/ports/repositories/UserRepository'

import { DrizzleDb } from '../connection'
import { usersTable } from '../schemas'

export class UserRepository implements IUserRepository {
  constructor(private db: DrizzleDb) {}

  private mapUser(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  async createUser(dto: CreateUserDTO): Promise<UserDTO> {
    const [user] = await this.db
      .insert(usersTable)
      .values({
        name: dto.name,
        email: dto.email,
        password: dto.password,
      })
      .returning()

    return this.mapUser(user)
  }

  async getUserById(userId: string): Promise<UserDTO> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))

    return this.mapUser(user)
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    return this.mapUser(user)
  }

  async updateUser(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    const [updatedUser] = await this.db
      .update(usersTable)
      .set({
        name: user.name,
        email: user.email,
      })
      .where(eq(usersTable.id, userId))
      .returning()

    return this.mapUser(updatedUser)
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    await this.db
      .update(usersTable)
      .set({ password })
      .where(eq(usersTable.id, userId))
  }

  async deleteUser(userId: string): Promise<void> {
    await this.db.delete(usersTable).where(eq(usersTable.id, userId))
  }
}
