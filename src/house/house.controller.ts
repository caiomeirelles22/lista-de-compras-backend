import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HouseService } from './house.service';
import { ItemService } from 'src/item/item.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { JoinHouseDto } from './dto/join-house.dto';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { House } from './entities/house.entity';
import { Item } from 'src/item/item.entity';

@ApiTags('Casas')
@Controller('houses')
export class HouseController {
  constructor(
    private readonly houseService: HouseService,
    private readonly itemService: ItemService,
  ) { }

  @ApiOperation({ summary: 'Criar uma nova casa' })
  @ApiResponse({ status: 201, description: 'Casa criada com sucesso.', type: House })
  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  @ApiOperation({ summary: 'Adicionar um membro à casa através do telemóvel' })
  @ApiResponse({ status: 201, description: 'Membro adicionado com sucesso.', type: House })
  @Post(':id/members')
  addMember(
    @Param('id') houseId: string,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.houseService.addMemberByPhone(houseId, addMemberDto);
  }

  @ApiOperation({ summary: 'Listar todas as casas do sistema' })
  @ApiResponse({ status: 200, description: 'Lista de casas encontradas.', type: [House] })
  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @ApiOperation({ summary: 'Procurar uma casa por ID' })
  @ApiResponse({ status: 200, description: 'Retorna os detalhes da casa, membros e itens.', type: House })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar os dados de uma casa' })
  @ApiResponse({ status: 200, description: 'Casa atualizada com sucesso.', type: House })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }

  @ApiOperation({ summary: 'Remover uma casa (apenas se a lista estiver vazia)' })
  @ApiResponse({ status: 200, description: 'Casa removida com sucesso.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(id);
  }

  @ApiOperation({ summary: 'Entrar numa casa utilizando o código de convite' })
  @ApiResponse({ status: 201, description: 'Utilizador associado à casa com sucesso.', type: House })
  @Post('join')
  join(@Body() joinHouseDto: JoinHouseDto) {
    return this.houseService.join(joinHouseDto);
  }

  @ApiOperation({ summary: 'Remover um membro de uma casa específica' })
  @ApiResponse({ status: 200, description: 'Membro removido com sucesso.', type: House })
  @Delete(':houseId/members/:userId')
  removeMember(@Param('houseId') houseId: string, @Param('userId') userId: string) {
    return this.houseService.removeMember(houseId, userId);
  }

  @ApiOperation({ summary: 'Listar todos os itens da lista de compras de uma casa' })
  @ApiResponse({ status: 200, description: 'Lista de itens vinculados à casa.', type: [Item] })
  @Get(':id/items')
  findAllItemsByHouse(@Param('id') houseId: string) {
    return this.itemService.findAllByHouse(houseId);
  }

  @ApiOperation({ summary: 'Criar e adicionar um item diretamente à casa' })
  @ApiResponse({ status: 201, description: 'Item adicionado com sucesso.', type: Item })
  @Post(':id/items')
  createItem(
    @Param('id') houseId: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.create(houseId, createItemDto);
  }
}