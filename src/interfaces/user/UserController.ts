import { Body, Controller, Get, HttpStatus, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  ChangePasswordDTO,
  CreateUserDTO,
  DeleteAccountDTO,
  SignInDTO,
} from './RequestDTOs';
import { UserMapper } from 'src/mapper/UserMapper';
import { UserService } from 'src/application/user/UserService';
import { UserMessage, generateUserMessage } from './UserMessage';
import { AuthService } from 'src/application/auth/AuthService';
import { AuthGuard } from 'src/infra/security/AuthGuard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async signUp(@Body() dto: CreateUserDTO) {
    const user = UserMapper.createUserDTOToUser(dto);
    this.userService.createUser(user);
    return generateUserMessage(UserMessage.USER_CREATED);
  }

  @Post('/signin')
  async signIn(@Body() dto: SignInDTO) {
    const token = this.authService.signIn(dto.nickname, dto.password);
    return token;
  }

  @UseGuards(AuthGuard)
  @Get('/:nickname')
  async getProfile(@Param('nickname') nickname: string) {
    return this.userService.getUser(nickname);
  }

  @UseGuards(AuthGuard)
  @Post('/changePassword')
  async changePassword(@Body() dto: ChangePasswordDTO, @Req() request: any) {
    if (dto.nickname !== request.user.sub) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUser(dto.nickname);

    if (dto.oldPassword !== user.password) {
      throw new UnauthorizedException();
    }
    
    this.userService.changePassword(dto.nickname, dto.newPassword);
    return generateUserMessage(UserMessage.PASSWORD_CHANGED);
  }

  @UseGuards(AuthGuard)
  @Post('/bye')
  async deleteAccount(@Body() dto: DeleteAccountDTO, @Req() request: any) {
    if (dto.nickname !== request.user.sub) {
      throw new UnauthorizedException();
    }
    this.userService.deleteUser(dto.nickname);
    return generateUserMessage(UserMessage.USER_DELETED);
  }
}