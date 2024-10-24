import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsDate } from 'class-validator';

import { User } from 'src/user/user.model';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  @IsOptional()
  photoURL: string;

  @IsString()
  @IsOptional()
  backgroundURL: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsDate()
  @IsOptional()
  dayOfBirth: Date;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  friends: User[];

  @IsOptional()
  friendRequests: User[];

  @IsOptional()
  sentRequests: User[];

  @IsOptional()
  blockedUsers: User[];

  @IsOptional()
  blockedBy: User[];
}
