import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/infra/user/IUserRepository';
import { User } from 'src/model/user/User';
import { HashEncryptor } from 'src/utils/Hash';
import { Random } from 'src/utils/Random';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UserService {
  constructor(@UserRepo() private readonly userRepository: IUserRepository) {}

  public async createUser(user: Partial<User>) {
    user.salt = Random.generateRandomString(32);
    user.password = HashEncryptor.generateHash(user.password, user.salt);
    const createdUser = await this.userRepository.create(user);
    let savedUser = await this.userRepository.save(createdUser);
    return savedUser;
  }

  public async changePassword(nickname: string, password: string) {
    const user = await this.userRepository.findByNickname(nickname);
    user.password = HashEncryptor.generateHash(password, user.salt);
    this.userRepository.save(user);
  }

  public async deleteUser(nickname: string) {
    this.userRepository.softDelete(nickname);
  }

  public async getUser(nickname: string) {
    return this.userRepository.findByNickname(nickname);
  }
}
