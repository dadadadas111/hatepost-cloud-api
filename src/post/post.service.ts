import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/post.model';

@Injectable()
export class PostService {
  // user can create, update, delete, get their own posts
  // user can get news feed posts
  // user can get posts of a specific user
  // user can get posts of a specific tags filter

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    try {
      return await this.postModel.create({
        ...createPostDto,
        author: userId,
      });
    } catch (error) {
      Logger.error(error, 'PostService.create');
      throw new BadRequestException(error);
    }
  }

  async updatePost(
    postId: string,
    updatePostDto: UpdatePostDto,
    userId: string,
  ) {
    try {
      return await this.postModel.findOneAndUpdate(
        { _id: postId, author: userId },
        updatePostDto,
        { new: true },
      );
    } catch (error) {
      Logger.error(error, 'PostService.updatePost');
      throw new BadRequestException(error);
    }
  }

  async deletePost(postId: string, userId: string) {
    try {
      return await this.postModel.findOneAndDelete({
        _id: postId,
        author: userId,
      });
    } catch (error) {
      Logger.error(error, 'PostService.deletePost');
      throw new BadRequestException(error);
    }
  }

  async getPostById(postId: string) {
    try {
      return await this.postModel.findById(postId);
    } catch (error) {
      Logger.error(error, 'PostService.getPostById');
      throw new BadRequestException(error);
    }
  }

  async getPostsByUserId(userId: string) {
    try {
      return await this.postModel.find({ author: userId });
    } catch (error) {
      Logger.error(error, 'PostService.getPostsByUserId');
      throw new BadRequestException(error);
    }
  }

  async getNewsFeedPosts() {
    // random logic to get 30 posts
    try {
      return await this.postModel.find().limit(30);
    } catch (error) {
      Logger.error(error, 'PostService.getNewsFeedPosts');
      throw new BadRequestException(error);
    }
  }

  async getPostsByTags(tags: string[]) {
    try {
      return await this.postModel.find({ tags: { $in: tags } });
    } catch (error) {
      Logger.error(error, 'PostService.getPostsByTags');
      throw new BadRequestException(error);
    }
  }

  // RULES FOR UPVOTING AND DOWNVOTING
  // 1. cannot up/down vote a post more than once
  // 2. cannot up/down vote at the same time
  // 3. can remove up/down vote
  // 4. can change up/down vote
  // 5. cannot up/down vote own post

  async upvotePost(postId: string, userId: string) {
    try {
      const post = await this.postModel.findById(postId);
      // post.upvoters is an array of user who upvoted the post
      // if the user is already in the upvoters array, then remove the user from the upvoters array
      // if the user is not in the upvoters array, then add the user to the upvoters array
      if (post.upvoters.includes(userId)) {
        post.upvoters = post.upvoters.filter((id) => id !== userId);
        post.upvotes--;
        return await post.save();
      } else if (post.downvoters.includes(userId)) {
        post.downvoters = post.downvoters.filter((id) => id !== userId);
        post.downvotes--;
      }
      post.upvoters.push(userId);
      post.upvotes++;
      return await post.save();
    } catch (error) {
      Logger.error(error, 'PostService.upvotePost');
      throw new BadRequestException(error);
    }
  }

  async downvotePost(postId: string, userId: string) {
    try {
      const post = await this.postModel.findById(postId);
      if (post.downvoters.includes(userId)) {
        post.downvoters = post.downvoters.filter((id) => id !== userId);
        post.downvotes--;
        return await post.save();
      } else if (post.upvoters.includes(userId)) {
        post.upvoters = post.upvoters.filter((id) => id !== userId);
        post.upvotes--;
      }
      post.downvoters.push(userId);
      post.downvotes++;
      return await post.save();
    } catch (error) {
      Logger.error(error, 'PostService.downvotePost');
      throw new BadRequestException(error);
    }
  }
}
