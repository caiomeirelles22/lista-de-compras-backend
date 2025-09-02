import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { House } from 'src/house/entities/house.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { phone } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { phone } });
    if (existingUser) {
      throw new ConflictException('Este número de celular já está em uso.');
    }

    const user = this.userRepository.create(createUserDto);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Este número de celular já está em uso.');
      }
      throw error; 
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['houses', 'itemsAdded'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['houses', 'itemsAdded'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['houses', 'itemsAdded'],
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { phone },
      relations: ['houses', 'itemsAdded'],
    });
  }

  async addToHouse(userId: string, houseId: string): Promise<User> {
    const user = await this.findOne(userId);
    const house = await this.houseRepository.findOne({ where: { id: houseId }, relations: ['members'] });

    if (!house) {
      throw new NotFoundException(`House with id ${houseId} not found`);
    }

    if (!user.houses.some(h => h.id === house.id)) {
      user.houses.push(house);
      await this.userRepository.save(user);
    }

    return user;
  }

  async removeFromHouse(userId: string, houseId: string): Promise<User> {
    const user = await this.findOne(userId);
    user.houses = user.houses.filter(h => h.id !== houseId);
    await this.userRepository.save(user);
    return user;
  }

  async updateUsername(userId: string, newUsername: string): Promise<User> {
    const user = await this.findOne(userId);
    user.username = newUsername;
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);
  }
}
