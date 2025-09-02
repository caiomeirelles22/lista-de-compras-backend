import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([House, User]),
    ItemModule,
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule { }