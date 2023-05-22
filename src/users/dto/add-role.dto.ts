import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Should be a string' })
  readonly userRole: string;

  @IsNumber({}, { message: 'Should be a number'})
  readonly userId: number;
}