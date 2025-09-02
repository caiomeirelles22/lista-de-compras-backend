import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { User } from 'src/user/entities/user.entity';
import { House } from 'src/house/entities/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User, House])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService], 
})
export class ItemModule {}