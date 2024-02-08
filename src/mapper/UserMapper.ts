import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user/User';
import { CreateUserDTO } from 'src/model/user/UserRequest';
import { UserResponseDTO } from 'src/model/user/UserResponse';

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

  public static userToUserResponseDTO(user: User) {
    const userResponse: UserResponseDTO = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt
    }

    return userResponse;
  }
}