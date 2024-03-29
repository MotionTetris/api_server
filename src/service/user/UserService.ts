import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/infra/user/IUserRepository';
import { UserMapper } from 'src/mapper/UserMapper';
import { User } from 'src/model/user/User';
import { UserResponseDTO } from 'src/model/user/UserResponse';
import { HashEncryptor } from 'src/utils/Hash';
import { Random } from 'src/utils/Random';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UserService {
  constructor(@UserRepo() private readonly userRepository: IUserRepository) {}

  public async createUser(user: Partial<User>, ip: string) {
    user.salt = Random.generateRandomString(32);
    user.password = HashEncryptor.generateHash(user.password, user.salt);
    const createdUser = await this.userRepository.create(user);
    createdUser.verifyCode = Random.generateUUID();
    createdUser.signUpIp = ip;
    const savedUser = await this.userRepository.save(createdUser);
    return savedUser;
  }

  public async verifyUser(nickname: string, uuid: string) {
    const user = await this.userRepository.findByNickname(nickname);
    if (user.verified) {
      throw new UnauthorizedException();
    }

    if (user.verifyCode !== uuid) {
      throw new UnauthorizedException();
    }

    user.verified = true;
    user.signUpIp = undefined;
    await this.userRepository.save(user);
  }

  public async changePassword(
    nickname: string,
    old_password: string,
    new_password: string,
  ) {
    const user = await this.userRepository.findByNickname(nickname);
    if (old_password !== user.password) {
      throw new UnauthorizedException();
    }

    user.password = HashEncryptor.generateHash(new_password, user.salt);
    await this.userRepository.save(user);
  }

  public async deleteUser(nickname: string) {
    await this.userRepository.softDelete(nickname);
  }

  public async getUser(nickname: string) {
    return await this.userRepository.findByNickname(nickname);
  }
}
