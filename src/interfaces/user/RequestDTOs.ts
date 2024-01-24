import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  public readonly nickname: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class ChangePasswordDTO {
  @IsString()
  public readonly nickname: string;

  @IsString()
  public readonly oldPassword: string;

  @IsString()
  public readonly newPassword: string;
}

export class DeleteAccountDTO {
  @IsString()
  public readonly nickname: string;
}

export class SignInDTO {
  @IsString()
  public readonly nickname: string;

  @IsString()
  public readonly password: string;
}
