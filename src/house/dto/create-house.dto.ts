import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty({ example: 'Casa de Praia', description: 'O nome escolhido para a casa ou grupo' })
  @IsString({ message: 'O nome da casa deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da casa não pode ser vazio.' })
  name: string;

  @ApiProperty({ example: 'b2a7243c-a5db-493c-b4df-572f803a367c', description: 'O ID (UUID) do utilizador criador da casa' })
  @IsUUID('all', { message: 'O ID do utilizador fornecido é inválido (deve ser um UUID).' })
  @IsNotEmpty({ message: 'O ID do criador da casa (userId) é obrigatório.' })
  userId: string;
}