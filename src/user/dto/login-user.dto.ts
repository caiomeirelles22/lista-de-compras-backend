import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: '22999999999' })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  phone: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}