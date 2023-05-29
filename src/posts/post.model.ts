import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface IPostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'Posts'})

export class Post extends Model<Post, IPostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'The unique indeficator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'First post', description: 'A post title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'First post content', description: 'A content' })
  @Column({ type: DataType.STRING, allowNull: false  })
  content: string;

  @ApiProperty({ example: 'http://image.com/1111', description: 'Image link' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}