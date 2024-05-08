import { AuthForgotPasswordDto } from '@techcell/node-sdk';
import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class AuthForgotPw implements AuthForgotPasswordDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail(undefined, { message: 'Email phải là một email hợp lệ' })
  email: string;

  @IsOptional()
  @IsUrl(
    { require_tld: false, protocols: ['http', 'https'] },
    { message: 'returnUrl phải là một url hợp lệ' },
  )
  returnUrl?: string | undefined;

  constructor(params: AuthForgotPw) {
    this.email = params?.email || '';
    this.returnUrl = params?.returnUrl ?? '';
  }
}
