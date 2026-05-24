import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { User } from 'src/user/entities/user.entity';
import { House } from 'src/house/entities/house.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(House) private readonly houseRepository: Repository<House>,
  ) { }

  async create(houseId: string, createItemDto: CreateItemDto): Promise<Item> {
    const { name, quantity, measure, userId, observations } = createItemDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const house = await this.houseRepository.findOneBy({ id: houseId });
    if (!house) throw new NotFoundException(`House with id ${houseId} not found`);

    const item = this.itemRepository.create({
      name, quantity, measure, observations, addedBy: user, house,
    });

    return this.itemRepository.save(item);
  }

  async findAllByHouse(houseId: string): Promise<Item[]> {
    return this.itemRepository.find({
      where: { house: { id: houseId } },
      relations: ['addedBy', 'boughtBy'], // 👈 Trazemos os dados de quem criou e quem comprou
      order: { createdAt: 'ASC' }
    });
  }

 async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id }, relations: ['addedBy', 'boughtBy', 'house'] });
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.preload({ id, ...updateItemDto });
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return this.itemRepository.save(item);
  }

  // 👇 NOVA FUNÇÃO: Alternar o status de comprado 👇
  // 👇 NOVA FUNÇÃO: Alternar o status de comprado 👇
  async toggleBought(id: string, userId: string): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id }, relations: ['addedBy', 'house', 'boughtBy'] });
    if (!item) throw new NotFoundException(`Item não encontrado`);

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`Usuário não encontrado`);

    if (item.isBought) {
      // 👇 NOVA REGRA: Só quem comprou pode desmarcar 👇
      if (item.boughtBy?.id !== userId) {
        throw new ForbiddenException('Apenas a pessoa que comprou este item pode desmarcá-lo.');
      }
      
      item.isBought = false;
      item.boughtAt = null;
      item.boughtBy = null;
    } else {
      item.isBought = true;
      item.boughtAt = new Date();
      item.boughtBy = user;
    }

    return this.itemRepository.save(item);
  }
  // 👇 REGRA DE NEGÓCIO: Só o dono pode apagar 👇
  async remove(id: string, userId: string): Promise<void> {
    const item = await this.itemRepository.findOne({ where: { id }, relations: ['addedBy'] });
    if (!item) throw new NotFoundException(`Item não encontrado`);

    if (item.addedBy.id !== userId) {
      throw new ForbiddenException('Apenas o usuário que adicionou este item pode deletá-lo da lista.');
    }

    await this.itemRepository.remove(item);
  }
}