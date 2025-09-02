import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { Item } from './item/item.entity';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { User } from './user/entities/user.entity';
import { House } from './house/entities/house.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'lista',
      entities: [User, House, Item],
      synchronize: true,
    }),
    ItemModule,
    UserModule,
    HouseModule,
  ],
})
export class AppModule { }
