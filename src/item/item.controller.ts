import { Controller, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Itens')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Obter os detalhes de um item específico por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do item encontrados.', type: Item })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar propriedades de um item (ex: alterar quantidade ou marcar observação)' })
  @ApiResponse({ status: 200, description: 'Item modificado com sucesso.', type: Item })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  @ApiOperation({ summary: 'Excluir um item definitivo da lista' })
  @ApiResponse({ status: 200, description: 'Item removido da lista com sucesso.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.itemService.remove(id);
  }
}