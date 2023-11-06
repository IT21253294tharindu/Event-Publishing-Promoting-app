import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from 'src/schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private FeedbackModel: Model<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    const newfeedback = new this.FeedbackModel(dto);
    await newfeedback.save();
    return newfeedback;
  }

  //find For a event
  async findForEvent(eventId: string) {
    return await this.FeedbackModel.find({ eventId: eventId }).populate(
      'createUser',
    );
  }

  async findOne(id: string) {
    return await this.FeedbackModel.findById(id);
  }

  async delete(id: string) {
    return await this.FeedbackModel.findByIdAndDelete(id);
  }

  async update(id: string, dto: CreateFeedbackDto) {
    return await this.FeedbackModel.findByIdAndUpdate(id, dto);
  }
}
