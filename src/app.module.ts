import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { Item } from './item/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.vtniqttqhyllfwxmngbn.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'wPlOMSVZcsbQXtbM',
      database: 'postgres',
      entities: [Item],
      synchronize: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized:
                process.env.SSL_REJECT_UNAUTHORIZED === 'true',
            }
          : false,
    }),
    ItemModule,
  ],
})
export class AppModule {}
