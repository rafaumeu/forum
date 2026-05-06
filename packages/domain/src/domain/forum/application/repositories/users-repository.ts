import { User } from '@/domain/forum/enterprise/entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
  save(user: User): Promise<void>
}
