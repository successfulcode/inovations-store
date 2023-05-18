import { Get, Injectable, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRespository: typeof Role) {}

  @Post()
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRespository.create(dto);

    return role;
  }

  @Get()
  async getRole(userRole: string) {
    const role = await this.roleRespository.findOne({where: {userRole}});

    return role;
  }
}
