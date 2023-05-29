import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Role } from 'src/roles/models/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/post.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})

export class UsersModule {}
