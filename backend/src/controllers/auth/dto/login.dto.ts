import { IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
