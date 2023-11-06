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
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private FeedbackService: FeedbackService) {}

  @HttpCode(200)
  @Post('create')
  create(@Request() req, @Body() dto: CreateFeedbackDto) {
    const userId = req.user.id;
    dto.createUser = userId;
    return this.FeedbackService.create(dto);
  }

  //find For a event
  @Get('for-event/:id')
  findForEvent(@Param('id') id: string) {
    return this.FeedbackService.findForEvent(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.FeedbackService.findOne(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.FeedbackService.delete(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: CreateFeedbackDto) {
    return this.FeedbackService.update(id, dto);
  }
}
