import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(item: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    return this.itemRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, item: Partial<Item>): Promise<Item> {
    await this.itemRepository.update(id, item);

    return this.itemRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
