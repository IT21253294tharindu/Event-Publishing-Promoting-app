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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/CreateEvent.dto';

@Controller('event')
export class EventController {
  constructor(private EventService: EventService) {}

  @HttpCode(200)
  @Post('create')
  create(@Request() req, @Body() dto: CreateEventDto) {
    const userId = req.user.id;
    dto.createUser = userId;
    dto.soldTickets = 0;
    return this.EventService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.EventService.findAll();
  }

  @Get('all/future')
  findAllFuture() {
    return this.EventService.findAllFuture();
  }

  @Get('all/my')
  findMyAll(@Request() req) {
    const id = req.user.id;
    return this.EventService.findMyAll(id);
  }

  @Get('all/my/past')
  findMyPastAll(@Request() req) {
    const id = req.user.id;
    return this.EventService.findMyPastAll(id);
  }

  @Get('all/my/future')
  findMyFutureAndCurrentAll(@Request() req) {
    const id = req.user.id;
    return this.EventService.findMyFutureAndCurrentAll(id);
  }

  @Get('all/my/count')
  findeventCount(@Request() req) {
    const id = req.user.id;
    return this.EventService.findeventCount(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.EventService.findOne(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.EventService.delete(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: CreateEventDto) {
    return this.EventService.update(id, dto);
  }

  @Post('buy-ticket')
  buyTickets(@Body() data) {
    return this.EventService.buyTickets(data.eventId, data.quantity);
  }
}
