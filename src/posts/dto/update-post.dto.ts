import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumber()
  @IsOptional()
  id: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string
}
