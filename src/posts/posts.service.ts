import { FilesService } from './../files/files.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRespository: typeof Post, private filesService: FilesService) {}

  async createPost(dto: CreatePostDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRespository.create({ ...dto, image: fileName})

    return post;
  }

}
