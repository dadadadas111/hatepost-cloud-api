import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  // author field should not be added here, since the author of the post should be the user who is creating
  // other fields shouldnt be added here, since a newly created post should not have upvotes, downvotes, upvoters, downvoters
}
