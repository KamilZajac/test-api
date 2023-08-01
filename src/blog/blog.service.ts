import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async getBlogPostById(id: number): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOne({ where: {id}});
    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }
    return blogPost;
  }

  async createBlogPost(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    if(!createBlogPostDto.author){
      throw new BadRequestException('Author is required')
    }
    if(!createBlogPostDto.title){
      throw new BadRequestException('Title is required')
    }
    if(!createBlogPostDto.content){
      throw new BadRequestException('Content is required')
    }

    const blogPost = this.blogPostRepository.create(createBlogPostDto);
    return this.blogPostRepository.save(blogPost);
  }

  async updateBlogPost(id: number, updateBlogPostDto: Partial<CreateBlogPostDto>): Promise<BlogPost> {
    const blogPost = await this.getBlogPostById(id);
    Object.assign(blogPost, updateBlogPostDto);
    return this.blogPostRepository.save(blogPost);
  }

  async deleteBlogPost(id: number): Promise<void> {
    const blogPost = await this.getBlogPostById(id);
    await this.blogPostRepository.remove(blogPost);
  }
}
