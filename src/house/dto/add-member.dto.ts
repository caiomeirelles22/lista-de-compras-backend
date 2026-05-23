import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
    @ApiProperty({ example: '22999999999', description: 'Número de telemóvel do membro a adicionar (apenas números, com indicativo/DDD)' })
    @IsString({ message: 'O telemóvel deve ser enviado como texto (string).' })
    @IsNotEmpty({ message: 'O número do telemóvel é obrigatório.' })
    @Length(11, 11, { message: 'O telemóvel deve ter exatamente 11 dígitos.' })
    @Matches(/^[0-9]+$/, { message: 'O telemóvel deve conter apenas números, sem espaços, traços ou parênteses.' })
    phone: string;
}