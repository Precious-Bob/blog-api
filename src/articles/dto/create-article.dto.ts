import { IsArray, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  description: string;

  @IsArray({ each: true })
  @IsString({ each: true })
  tagList: string[];
}
