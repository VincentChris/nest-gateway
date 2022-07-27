import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'vincent' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'vincentchris@126.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'vincentchris' })
  @IsNotEmpty()
  username: string;
}
