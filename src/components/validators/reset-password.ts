import {
  IsNotEmpty,
  MinLength,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { AuthResetPasswordDto } from '@techcell/node-sdk';

export function IsPasswordMatching(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordMatching',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { password } = args.object as any;
          return password === value;
        },
        defaultMessage(args: ValidationArguments) {
          const msg =
            validationOptions?.message?.toString() ?? 'Password and RePassword must match';
          return msg;
        },
      },
    });
  };
}
export class AuthResetPassword implements AuthResetPasswordDto {
  @IsNotEmpty()
  hash = '';

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự' })
  password = '';

  @IsNotEmpty({ message: 'Nhập lại mật khẩu không được để trống' })
  @MinLength(6, { message: 'Nhập lại mật khẩu phải chứa ít nhất 6 ký tự' })
  @ValidateIf((_, value) => value !== undefined)
  @IsPasswordMatching({ message: 'Hai mật khẩu phải giống nhau' })
  rePassword = '';

  constructor(data?: AuthResetPassword) {
    this.password = data?.password || '';
    this.hash = data?.hash || '';
    this.rePassword = data?.rePassword || '';
  }
}
