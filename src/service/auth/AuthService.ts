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

  async signIn(nickname: string, password: string, ip: string) {
    const user = await this.userService.getUser(nickname);
    if (!user.verified) {
      throw new UnauthorizedException();
    }

    const hash = HashEncryptor.generateHash(password, user.salt);

    if (hash !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.nickname, ip: ip };
    return {
      nickname: user.nickname,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async guestLogin(ip: string) {
    const guestId = `GUEST_${Math.floor(100000 + Math.random() * 900000)}`;
    const payload = { sub: guestId, ip: ip };
    return {
      nickname: guestId,
      email: 'none',
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
