import { IsNotEmpty, IsString, IsNumber, IsUUID, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'Arroz Agulha', description: 'Nome do produto a adicionar' })
  @IsString({ message: 'O nome do item deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do item é obrigatório.' })
  name: string;

  @ApiProperty({ example: 2, description: 'Quantidade do produto (mínimo 1)' })
  @IsNumber({}, { message: 'A quantidade deve ser um número válido.' })
  @Min(1, { message: 'A quantidade mínima é 1.' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  quantity: number;

  @ApiProperty({ example: 'kg', description: 'Unidade de medida (ex: kg, unidades, embalagens)' })
  @IsString({ message: 'A medida deve ser um texto (ex: kg, unidades).' })
  @IsNotEmpty({ message: 'A unidade de medida é obrigatória.' })
  measure: string;

  @ApiProperty({ example: 'b2a7243c-a5db-493c-b4df-572f803a367c', description: 'ID do utilizador que está a adicionar o item' })
  @IsUUID('all', { message: 'O ID do utilizador fornecido é inválido (deve ser um UUID).' })
  @IsNotEmpty({ message: 'O ID do utilizador (userId) é obrigatório.' })
  userId: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', description: 'ID da casa à qual a lista pertence' })
  @IsUUID('all', { message: 'O ID da casa fornecido é inválido (deve ser um UUID).' })
  @IsNotEmpty({ message: 'O ID da casa (houseId) é obrigatório.' })
  houseId: string;

  @ApiPropertyOptional({ example: 'Comprar da marca X do pacote azul', description: 'Observações adicionais sobre o item' })
  @IsString({ message: 'As observações devem ser em formato de texto.' })
  @IsOptional()
  observations?: string;
}