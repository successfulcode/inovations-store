import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Post } from './post.model';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [PostsService, FilesService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post])
  ],
})
export class PostsModule {}
