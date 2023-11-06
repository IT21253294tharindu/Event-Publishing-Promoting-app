import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sponsor } from 'src/schemas/sponsor.schema';
import { CreateSponsorDto } from './dto/create-sponsor.dto';

@Injectable()
export class SponsorService {
  constructor(
    @InjectModel(Sponsor.name) private SponsorModel: Model<Sponsor>,
  ) {}

  async create(dto: CreateSponsorDto) {
    const newSponsor = new this.SponsorModel(dto);
    await newSponsor.save();
    return newSponsor;
  }

  async findAll() {
    return await this.SponsorModel.find();
  }

  async findMyAll(id: string) {
    return await this.SponsorModel.find({ createdUser: id });
  }

  async findOne(id: string) {
    return await this.SponsorModel.findById(id);
  }

  async delete(id: string) {
    return await this.SponsorModel.findByIdAndDelete(id);
  }

  async update(id: string, dto: CreateSponsorDto) {
    return await this.SponsorModel.findByIdAndUpdate(id, dto);
  }
}
