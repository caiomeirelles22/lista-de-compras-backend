import { Controller, Get, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Itens')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Obter os detalhes de um item específico por ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar propriedades de um item' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  // 👇 NOVA ROTA: Marcar/Desmarcar 👇
  @ApiOperation({ summary: 'Marcar ou desmarcar item como comprado' })
  @Patch(':id/toggle-bought')
  async toggleBought(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<Item> {
    return this.itemService.toggleBought(id, userId);
  }

  // 👇 ATUALIZADO: Agora exige o userId por parâmetro de query 👇
  @ApiOperation({ summary: 'Excluir um item definitivo da lista' })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    return this.itemService.remove(id, userId);
  }
}