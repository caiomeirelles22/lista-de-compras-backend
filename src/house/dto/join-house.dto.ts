import { IsNotEmpty, IsString, IsUUID, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinHouseDto {
  @ApiProperty({ example: 'b2a7243c-a5db-493c-b4df-572f803a367c', description: 'O ID (UUID) do utilizador que está a entrar na casa' })
  @IsUUID('all', { message: 'O ID do utilizador fornecido é inválido (deve ser um UUID).' })
  @IsNotEmpty({ message: 'O ID do utilizador (userId) é obrigatório.' })
  userId: string;

  @ApiProperty({ example: '54321', description: 'O código de 5 dígitos gerado automaticamente pela casa' })
  @IsString({ message: 'O código deve ser enviado como texto (string).' })
  @IsNotEmpty({ message: 'O código de convite é obrigatório.' })
  @Length(5, 5, { message: 'O código da casa deve ter exatamente 5 dígitos.' })
  @Matches(/^[0-9]+$/, { message: 'O código da casa deve conter apenas números.' })
  code: string;
}