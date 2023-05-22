import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'The user email' })
  @IsString({ message: 'It should be a string' })
  @IsEmail({}, { message: 'Not valid email' })
  readonly email: string;
  
  @ApiProperty({ example: 'test12345', description: 'The user password' })
  @IsString({ message: 'It should be a string' })
  @Length( 4, 16, { message: 'Minimum length 4 and max length 16' })
  readonly password: string;
}