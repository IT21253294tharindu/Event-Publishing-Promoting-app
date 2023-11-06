import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  feedback: string;

  @IsOptional()
  date: string;

  @IsOptional()
  rating: number;

  @IsNotEmpty()
  eventId: string;

  @IsOptional()
  createUser: string;
}
