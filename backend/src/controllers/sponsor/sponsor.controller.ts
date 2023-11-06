import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';

@Controller('sponsor')
export class SponsorController {
  constructor(private SponsorService: SponsorService) {}

  @HttpCode(200)
  @Post('create')
  create(@Request() req, @Body() dto: CreateSponsorDto) {
    const userId = req.user.id;
    dto.createdUser = userId;
    return this.SponsorService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.SponsorService.findAll();
  }

  @Get('all/my')
  findMyAll(@Request() req) {
    const id = req.user.id;
    return this.SponsorService.findMyAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SponsorService.findOne(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.SponsorService.delete(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: CreateSponsorDto) {
    return this.SponsorService.update(id, dto);
  }
}
