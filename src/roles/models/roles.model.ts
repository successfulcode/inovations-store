import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { UserRoles } from 'src/roles/models/user-roles.model';

interface IRoleCreationAttrs {
  userRole: string,
  description: string
}

@Table({ tableName: 'roles'})

export class Role extends Model<Role, IRoleCreationAttrs> {
  @ApiProperty({ example: 'ADMIN', description: 'The user role' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  userRole: string;

  @ApiProperty({ example: 'Administrator', description: 'The role description' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}