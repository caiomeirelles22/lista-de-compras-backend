import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { Item } from './item/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.jxwurebyjmmmdiesxwld.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'XPKem9C89DeFdNhS',
      database: 'postgres',
      entities: [Item],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: { rejectUnauthorized: false },
    }),

    ItemModule,
  ],
})
export class AppModule {}
