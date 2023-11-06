import { IsNotEmpty } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  accountType: string;
}
