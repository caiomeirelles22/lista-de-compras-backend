import { Controller, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.itemService.remove(id);
  }
}