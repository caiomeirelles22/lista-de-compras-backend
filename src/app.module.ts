import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { ItemModule } from './item/item.module';
import { User } from './user/entities/user.entity';
import { House } from './house/entities/house.entity';
import { Item } from './item/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, House, Item],
      synchronize: true, // Deixei true para criar as tabelas no primeiro deploy na AWS

      // 👇 A CORREÇÃO ESTÁ AQUI
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    HouseModule,
    ItemModule,
  ],
})
export class AppModule {}