import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly userId: number;
}