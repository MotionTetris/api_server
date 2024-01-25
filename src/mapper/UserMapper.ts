import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user/User';
import { CreateUserDTO } from 'src/model/user/UserRequest';

@Injectable()
export class UserMapper {
  public static createUserDTOToUser(dto: CreateUserDTO): Partial<User> {
    const partialUser: Partial<User> = {
      nickname: dto.nickname,
      email: dto.email,
      password: dto.password,
      verified: false,
    };

    return partialUser;
  }
}
