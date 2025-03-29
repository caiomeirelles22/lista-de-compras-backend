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
      password: 'iV92wYYM2erKuO85',
      entities: [Item],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: {
        rejectUnauthorized: false, // Força o uso de SSL
      },
    }),
    ItemModule,
  ],
})
export class AppModule {}
