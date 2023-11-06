import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSponsorDto {
  @IsNotEmpty()
  sponsorship: string;

  @IsNotEmpty()
  budget: number;

  @IsNotEmpty()
  eventType: string;

  @IsNotEmpty()
  location: any;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  createdUser: string;
}
