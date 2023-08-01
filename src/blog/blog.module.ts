import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPostController } from './blog.controller';
import { BlogPost } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [BlogPostController],
  providers: [BlogService]
})
export class BlogModule {}
