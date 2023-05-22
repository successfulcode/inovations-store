import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  
  @ApiProperty({ example: 'ADMIN', description: 'The user role' })
  readonly userRole: string;
  
  @ApiProperty({ example: 'Administrator', description: 'The role description' })
  readonly description: string;
}