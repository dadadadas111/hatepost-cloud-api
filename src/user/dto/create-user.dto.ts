import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  photoURL: string;

  @IsString()
  @IsNotEmpty()
  backgroundURL: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dayOfBirth: Date;

  @IsString()
  @IsOptional()
  phoneNumber: string;
}
