import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da casa não pode ser vazio.' })
  name: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}