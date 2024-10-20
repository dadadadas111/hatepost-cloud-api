import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from 'src/tag/tag.model';
import mongoose, { Model, mongo } from 'mongoose';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>,
  ) { }

  async create(createTagDto: CreateTagDto) {
    try {
      return await this.tagModel.create(createTagDto);
    } catch (error) {
      Logger.error(error, 'TagService.create');
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return await this.tagModel.find().exec();
    } catch (error) {
      Logger.error(error, 'TagService.findAll');
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const tag = await this.tagModel.findById(id).exec();
      if (!tag) {
        throw new NotFoundException('Tag not found');
      }
      return tag;
    } catch (error) {
      Logger.error(error, 'TagService.findOne');
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    try {
      const updatedTag = await this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true }).exec();
      if (!updatedTag) {
        throw new NotFoundException('Tag not found');
      }
      return updatedTag;
    } catch (error) {
      Logger.error(error, 'TagService.update');
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.tagModel.updateMany({ superTag: new mongoose.Types.ObjectId(id) }, { superTag: null }).exec();
      const deletedTag = await this.tagModel.findByIdAndDelete(id).exec();
      if (!deletedTag) {
        throw new NotFoundException('Tag not found');
      }
      return deletedTag;
    } catch (error) {
      Logger.error(error, 'TagService.remove');
      throw new BadRequestException(error);
    }
  }
}
