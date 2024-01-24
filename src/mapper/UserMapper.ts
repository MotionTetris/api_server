import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/User';
import { CreateUserDTO } from 'src/interfaces/user/RequestDTOs';

@Injectable()
export class UserMapper {
  public static createUserDTOToUser(dto: CreateUserDTO): Partial<User> {
    const partialUser: Partial<User> = {
      nickname: dto.nickname,
      email: dto.email,
      password: dto.password,
    };

    return partialUser;
  }
}
