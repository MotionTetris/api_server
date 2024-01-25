import { User } from '../../model/user/User';

export interface IUserRepository {
  findByNickname(nickname: string): Promise<User>;
  create(user: Partial<User>): Promise<User>;
  softDelete(nickname: string): Promise<void>;
  save(user: Partial<User>): Promise<User>;
}
