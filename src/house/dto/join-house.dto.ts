import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class JoinHouseDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5, { message: 'O código deve ter exatamente 5 dígitos.' })
  code: string;
}