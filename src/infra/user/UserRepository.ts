import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/infra/user/IUserRepository';
import { User } from 'src/model/user/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }

  async softDelete(nickname: string): Promise<void> {
    await this.userRepository.softDelete({ nickname: nickname });
  }

  async save(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findByNickname(nickname: string): Promise<User> {
    return await this.userRepository.findOne({ where: { nickname: nickname } });
  }
}
