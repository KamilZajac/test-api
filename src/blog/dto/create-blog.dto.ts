import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  author: string;
}