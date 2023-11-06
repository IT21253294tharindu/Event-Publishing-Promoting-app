import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: registerDto) {
    const hash = await argon.hash(dto.password);
    dto.password = hash;

    const createdUser = new this.userModel(dto);
    await createdUser.save();

    // Exclude password field from the returned document
    const savedUser = await this.userModel
      .findById(createdUser._id)
      .select('-password')
      .exec();
    return savedUser;
  }

  async login(dto: loginDto) {
    const user = await this.userModel.findOne({ email: dto.email }).exec();

    if (!user) {
      throw new ForbiddenException('Credintials Incorrect');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credintials Incorrect');
    }

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.sign(payload);

    return {
      token,
      accountType: user.accountType,
      username: user.userName,
    };
  }

  //   //Get User Details
  //   async getUserDetails(userId: String) {
  //     return this.userModel.findById(userId).select('-password').exec();
  //   }

  //   //Update account blance
  //   async increseAccountBalance(userId: String, amount: number) {
  //     const filter = { _id: userId };
  //     const update = { $inc: { accountBalance: amount } };
  //     return this.userModel.updateOne(filter, update).exec();
  //   }

  //   async decreseAccountBalance(userId: String, amount: number) {
  //     const filter = { _id: userId };
  //     const update = { $inc: { accountBalance: -amount } };
  //     return this.userModel.updateOne(filter, update).exec();
  //   }
}
