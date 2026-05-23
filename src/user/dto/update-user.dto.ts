import { PartialType } from '@nestjs/swagger'; // <-- Alterado aqui
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}