import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/UserService';
import { HashEncryptor } from 'src/utils/Hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(nickname: string, password: string) {
    const user = await this.userService.getUser(nickname);
    const hash = HashEncryptor.generateHash(password, user.salt);

    if (hash !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.nickname };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
