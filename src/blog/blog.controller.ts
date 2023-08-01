import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog.dto';
import { BlogPost } from './entities/blog.entity';
import { ApiBody } from '@nestjs/swagger';



@Controller('blog-posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogService) {}


  @Get()
  getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostService.getAllBlogPosts();
  }

  @Get(':id')
  getBlogPostById(@Param('id') id: number): Promise<BlogPost> {
    return this.blogPostService.getBlogPostById(id);
  }


  @Post()
  createBlogPost(@Body() createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogPostService.createBlogPost(createBlogPostDto);
  }

  @Patch(':id')
  updateBlogPost(@Param('id') id: number, @Body() updateBlogPostDto: Partial<CreateBlogPostDto>): Promise<BlogPost> {
    return this.blogPostService.updateBlogPost(id, updateBlogPostDto);
  }

  @Delete(':id')
  deleteBlogPost(@Param('id') id: number): Promise<void> {
    return this.blogPostService.deleteBlogPost(id);
  }
}