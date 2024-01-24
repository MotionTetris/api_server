import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/IUserRepository';
import { User } from 'src/domain/user/User';
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
    this.userRepository.softDelete({ nickname: nickname });
  }

  async save(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userRepository.findOne({ where: { nickname: nickname } });
  }
}
