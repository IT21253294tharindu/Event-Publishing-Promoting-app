import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  eventName: string;

  @IsNotEmpty()
  eventType: string;

  @IsOptional()
  date: string;

  @IsOptional()
  location: Record<string, any>;

  @IsOptional()
  time: string;

  @IsOptional()
  expectedCrowd: number;

  @IsOptional()
  expectedBudget: number;

  @IsOptional()
  ticketCount: number;

  @IsOptional()
  soldTickets: number;

  @IsOptional()
  ticketPrice: number;

  @IsOptional()
  description: string;

  @IsOptional()
  images: string[];

  @IsOptional()
  createUser: string;
}
