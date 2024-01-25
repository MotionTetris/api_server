import { Body, Controller, Get, HttpStatus, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  ChangePasswordDTO,
  CreateUserDTO,
  DeleteAccountDTO,
  SignInDTO,
} from '../model/user/UserRequest';
import { UserMapper } from 'src/mapper/UserMapper';
import { UserService } from 'src/service/user/UserService';
import { UserMessage, generateUserMessage } from '../model/user/UserMessage';
import { AuthService } from 'src/service/auth/AuthService';
import { AuthGuard } from 'src/infra/security/AuthGuard';
import { MailService } from 'src/service/mail/MailService';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async signUp(@Body() dto: CreateUserDTO) {
    const user = UserMapper.createUserDTOToUser(dto);
    await this.userService.createUser(user);
    await this.mailService.sendEmail(user.email, user.nickname);
    return generateUserMessage(UserMessage.USER_CREATED);
  }

  @Post('/signin')
  async signIn(@Body() dto: SignInDTO) {
    const token = await this.authService.signIn(dto.nickname, dto.password);
    return token;
  }

  @UseGuards(AuthGuard)
  @Get('/:nickname')
  async getProfile(@Param('nickname') nickname: string) {
    return await this.userService.getUser(nickname);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  async changePassword(@Body() dto: ChangePasswordDTO, @Req() request: any) {
    if (dto.nickname !== request.user.sub) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUser(dto.nickname);

    if (dto.old_password !== user.password) {
      throw new UnauthorizedException();
    }
    
    await this.userService.changePassword(dto.nickname, dto.new_password);
    return generateUserMessage(UserMessage.PASSWORD_CHANGED);
  }

  @UseGuards(AuthGuard)
  @Post('/bye')
  async deleteAccount(@Body() dto: DeleteAccountDTO, @Req() request: any) {
    if (dto.nickname !== request.user.sub) {
      throw new UnauthorizedException();
    }
    await this.userService.deleteUser(dto.nickname);
    return generateUserMessage(UserMessage.USER_DELETED);
  }
}
