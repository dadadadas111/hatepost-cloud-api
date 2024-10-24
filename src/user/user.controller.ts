import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // this controller is special. It take request user data and pass it to service layer
  // this make the controller layer thin and authentication works better

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req) {
    if (req.user.user_id !== createUserDto.userId) {
      throw new BadRequestException('User not authorized');
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  async getCurrentUser(@Req() req) {
    return this.userService.findUserByUserId(req.user.user_id);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateUser(req.user.user_id, updateUserDto);
  }
}
