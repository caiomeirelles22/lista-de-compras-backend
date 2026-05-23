import { PartialType } from '@nestjs/swagger'; // <-- Alterado aqui
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}