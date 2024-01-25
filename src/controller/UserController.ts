import { Body, Controller, Get, HttpStatus, Ip, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
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
  async signUp(@Body() dto: CreateUserDTO, @Ip() ip: string) {
    let user = UserMapper.createUserDTOToUser(dto);
    user = await this.userService.createUser(user, ip);
    await this.mailService.sendVerifyEmail(user.email, user.nickname, user.verifyCode);
    return generateUserMessage(UserMessage.SUCC_USER_CREATED);
  }

  @Get('/verify/:nickname/:uuid')
  async verifyUser(@Param('nickname') nickname: string, @Param('uuid') uuid: string, @Ip() ip: string) {
    await this.userService.verifyUser(nickname, uuid, ip);
    return generateUserMessage(UserMessage.SUCC_VERIFY_USER);
  }

  @Post('/signin')
  async signIn(@Body() dto: SignInDTO, @Ip() ip: string) {
    const token = await this.authService.signIn(dto.nickname, dto.password, ip);
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
    await this.userService.changePassword(request.user.sub, dto.old_password, dto.new_password);
    return generateUserMessage(UserMessage.SUCC_PASSWORD_CHANGED);
  }

  @UseGuards(AuthGuard)
  @Post('/bye')
  async deleteAccount(@Body() dto: DeleteAccountDTO, @Req() request: any) {
    await this.userService.deleteUser(dto.nickname);
    return generateUserMessage(UserMessage.SUCC_USER_DELETED);
  }
}
