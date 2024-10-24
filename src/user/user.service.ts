import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      Logger.error(error, 'UserService.create');
      throw new BadRequestException(error);
    }
  }

  async findUserByUserId(userId: string) {
    try {
      const user = await this.userModel.findOne({ userId }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      Logger.error(error, 'UserService.findUserByUserId');
      throw new BadRequestException(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userModel
        .findOne({
          email,
        })
        .exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      Logger.error(error, 'UserService.findUserByEmail');
      throw new BadRequestException(error);
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      delete updateUserDto.userId;
      delete updateUserDto.email;
      const user = await this.userModel.findOneAndUpdate(
        {
          userId,
        },
        {
          $set: updateUserDto,
        },
        {
          new: true,
        },
      );
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      Logger.error(error, 'UserService.updateUser');
      throw new BadRequestException(error);
    }
  }
}
