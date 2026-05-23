import { PartialType } from '@nestjs/swagger'; // <-- Alterado aqui
import { CreateHouseDto } from './create-house.dto';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {}