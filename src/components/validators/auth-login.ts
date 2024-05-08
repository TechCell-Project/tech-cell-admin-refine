import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthEmailLoginDto } from '@techcell/node-sdk';

export class AuthLogin implements AuthEmailLoginDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail(undefined, { message: 'Email phải là một email hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  constructor(auth?: AuthLogin) {
    this.email = auth?.email || '';
    this.password = auth?.password || '';
  }
}
