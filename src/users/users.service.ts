import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRole('USER');

    await user.$set('roles', [role.id])

    user.roles = [role]

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true }});

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });

    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);

    const role = await this.rolesService.getRole(addRoleDto.userRole);

    if (user && role) { 
      await user.$add('role', role.id);

      return addRoleDto;
    }
    
    throw new HttpException('The user or the role not found', HttpStatus.NOT_FOUND);
  }

  async ban(banUserDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banUserDto.userId);

    if (!user) {
      throw new HttpException('The user not found', HttpStatus.NOT_FOUND);
    }

    user.banned = true;

    user.bannedReason = banUserDto.banReason;

    user.save();

    return user;
  }
}