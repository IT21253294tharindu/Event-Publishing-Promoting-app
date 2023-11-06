import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/CreateEvent.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private EventModel: Model<Event>) {}

  async create(dto: CreateEventDto) {
    const newevent = new this.EventModel(dto);
    await newevent.save();
    return newevent;
  }

  async findAll() {
    return await this.EventModel.find();
  }

  async findAllFuture() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const events = await this.EventModel.find();

    const futureAndCurrentEvents = events.filter((event) => {
      const eventDate = new Date(event['date']);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate > currentDate;
    });

    return futureAndCurrentEvents;
  }

  async findMyAll(id: string) {
    return await this.EventModel.find({ createUser: id });
  }

  async findMyPastAll(id: string) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const events = await this.EventModel.find({
      createUser: id,
    });

    const pastEvents = events.filter((event) => {
      const eventDate = new Date(event['date']);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < currentDate;
    });

    return pastEvents;
  }

  async findMyFutureAndCurrentAll(id: string) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const events = await this.EventModel.find({
      createUser: id,
    });

    const futureAndCurrentEvents = events.filter((event) => {
      const eventDate = new Date(event['date']);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= currentDate;
    });

    return futureAndCurrentEvents;
  }

  async findeventCount(id: string) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const events = await this.EventModel.find({
      createUser: id,
    });

    const pastEvents = events.filter((event) => {
      const eventDate = new Date(event['date']);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < currentDate;
    });

    const futureAndCurrentEvents = events.filter((event) => {
      const eventDate = new Date(event['date']);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= currentDate;
    });

    return {
      pastEventsCount: pastEvents.length,
      futureEventCount: futureAndCurrentEvents.length,
    };
  }

  async findOne(id: string) {
    return await this.EventModel.findById(id);
  }

  async delete(id: string) {
    return await this.EventModel.findByIdAndDelete(id);
  }

  async update(id: string, dto: CreateEventDto) {
    return await this.EventModel.findByIdAndUpdate(id, dto);
  }

  async buyTickets(eventId: string, ticketCount: number) {
    const filter = { _id: eventId };
    const update = { $inc: { soldTickets: ticketCount } };
    return this.EventModel.updateOne(filter, update).exec();
  }
}
