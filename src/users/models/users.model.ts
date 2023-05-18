import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';

interface IUserCreationAttrs {
  email: string,
  password: string
}

@Table({ tableName: 'users'})

export class User extends Model<User, IUserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'The unique indeficator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'John Wick', description: 'The user name' })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @ApiProperty({ example: 'test@test.com', description: 'The user email' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({ example: 'test12345', description: 'The user password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: false, description: 'The user a banned status' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'The user broke rules', description: 'The user a banned status description' })
  @Column({ type: DataType.STRING, allowNull: true })
  bannedReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}