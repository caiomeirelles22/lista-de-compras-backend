import { IsEmail, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Caio Meirelles' })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @ApiProperty({ example: '22999999999' })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  phone: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;

  @ApiPropertyOptional({ example: 'caio_meirelles' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'caio@exemplo.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Por favor, envie um e-mail válido.' })
  email?: string;
}