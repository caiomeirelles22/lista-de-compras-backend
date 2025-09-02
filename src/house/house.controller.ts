import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { HouseService } from './house.service';
import { ItemService } from 'src/item/item.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { JoinHouseDto } from './dto/join-house.dto';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('houses')
export class HouseController {
  constructor(
    private readonly houseService: HouseService,
    private readonly itemService: ItemService,
  ) { }


  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  @Post(':id/members')
  addMember(
    @Param('id') houseId: string,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.houseService.addMemberByPhone(houseId, addMemberDto);
  }

  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(id);
  }

  @Post('join')
  join(@Body() joinHouseDto: JoinHouseDto) {
    return this.houseService.join(joinHouseDto);
  }

  @Delete(':houseId/members/:userId')
  removeMember(@Param('houseId') houseId: string, @Param('userId') userId: string) {
    return this.houseService.removeMember(houseId, userId);
  }


  @Get(':id/items')
  findAllItemsByHouse(@Param('id') houseId: string) {
    return this.itemService.findAllByHouse(houseId);
  }

  @Post(':id/items')
  createItem(
    @Param('id') houseId: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.create(houseId, createItemDto);
  }
}