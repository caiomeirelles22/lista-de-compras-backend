import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddMemberDto {
    @IsString()
    @IsNotEmpty()
    @Length(11, 11, { message: 'O celular deve ter 11 dígitos, incluindo DDD.' })
    phone: string;
}