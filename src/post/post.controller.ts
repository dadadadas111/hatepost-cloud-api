import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req) {
    try {
      const userId = req.user.user_id;
      return this.postService.create(createPostDto, userId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.create');
    }
  }

  @Patch(':postId')
  async update(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto, @Req() req) {
    try {
      const userId = req.user.user_id;
      return this.postService.updatePost(postId, updatePostDto, userId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.update');
    }
  }

  @Delete(':postId')
  async remove(@Param('postId') postId: string, @Req() req) {
    try {
      const userId = req.user.user_id;
      return this.postService.deletePost(postId, userId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.remove');
    }
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
    try {
      return this.postService.getPostById(postId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.getPostById');
    }
  }

  @Get()
  async getNewsFeed() {
    try {
      return this.postService.getNewsFeedPosts();
    } catch (error) {
      throw new BadRequestException(error, 'PostController.getNewsFeed');
    }
  }

  @Get('user/:userId')
  async getPostsByUser(@Param('userId') userId: string) {
    try {
      return this.postService.getPostsByUserId(userId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.getPostsByUser');
    }
  }

  @Get('tags/:tags')
  async getPostsByTag(@Param('tags') tags: string) {
    try {
      // separate tags by comma
      const separatedTags = tags.split(',');
      return this.postService.getPostsByTags(separatedTags);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.getPostsByTag');
    }
  }

  // maybe add a better filter route here

  @Post('upvote/:postId')
  async upvotePost(@Param('postId') postId: string, @Req() req) {
    try {
      const userId = req.user.user_id;
      return this.postService.upvotePost(postId, userId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.upvotePost');
    }
  }

  @Post('downvote/:postId')
  async downvotePost(@Param('postId') postId: string, @Req() req) {
    try {
      const userId = req.user.user_id;
      return this.postService.downvotePost(postId, userId);
    } catch (error) {
      throw new BadRequestException(error, 'PostController.downvotePost');
    }
  }
}
