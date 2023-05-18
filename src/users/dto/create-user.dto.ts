import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'The user email' })
  readonly email: string;
  
  @ApiProperty({ example: 'test12345', description: 'The user password' })
  readonly password: string;
}