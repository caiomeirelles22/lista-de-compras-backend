import { Controller, Get, Post, Param, Body, Delete, Patch, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@ApiTags('Usuários') // Cria uma categoria na documentação
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Buscar usuário por username' })
  @ApiQuery({ name: 'username', required: true, example: 'caio_meirelles' })
  @ApiResponse({ status: 200, description: 'Retorna o usuário encontrado.', type: User })
  @Get('by-username')
  async findByUsername(@Query('username') username: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Buscar usuário por telefone' })
  @ApiQuery({ name: 'phone', required: true, example: '22999999999' })
  @ApiResponse({ status: 200, description: 'Retorna o usuário encontrado.', type: User })
  @Get('by-phone')
  async findByPhone(@Query('phone') phone: string): Promise<User> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários.', type: [User] }) // [User] indica que é um Array
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Retorna o usuário.', type: User })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Atualizar username' })
  @ApiResponse({ status: 200, description: 'Username atualizado.', type: User })
  @Patch(':id/username')
  async updateUsername(@Param('id') id: string, @Body('username') username: string): Promise<User> {
    return this.userService.updateUsername(id, username);
  }

  @ApiOperation({ summary: 'Remover usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: 'Adicionar usuário a uma casa' })
  @ApiResponse({ status: 201, description: 'Usuário adicionado à casa com sucesso.', type: User })
  @Post(':userId/houses/:houseId')
  async addToHouse(@Param('userId') userId: string, @Param('houseId') houseId: string): Promise<User> {
    return this.userService.addToHouse(userId, houseId);
  }

  @ApiOperation({ summary: 'Remover usuário de uma casa' })
  @ApiResponse({ status: 200, description: 'Usuário removido da casa.', type: User })
  @Delete(':userId/houses/:houseId')
  async removeFromHouse(@Param('userId') userId: string, @Param('houseId') houseId: string): Promise<User> {
    return this.userService.removeFromHouse(userId, houseId);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<User> {
    return this.userService.login(loginDto);
  }
}