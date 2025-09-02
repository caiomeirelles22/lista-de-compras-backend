import { Controller, Get, Post, Param, Body, Delete, Patch, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('by-username')
  async findByUsername(@Query('username') username: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  @Get('by-phone')
  async findByPhone(@Query('phone') phone: string): Promise<User> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found`);
    }
    return user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> { 
    return this.userService.create(createUserDto); 
  }
 
  @Patch(':id/username')
  async updateUsername(@Param('id') id: string, @Body('username') username: string): Promise<User> {
    return this.userService.updateUsername(id, username);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Post(':userId/houses/:houseId')
  async addToHouse(@Param('userId') userId: string, @Param('houseId') houseId: string): Promise<User> {
    return this.userService.addToHouse(userId, houseId);
  }

  @Delete(':userId/houses/:houseId')
  async removeFromHouse(@Param('userId') userId: string, @Param('houseId') houseId: string): Promise<User> {
    return this.userService.removeFromHouse(userId, houseId);
  }
}
