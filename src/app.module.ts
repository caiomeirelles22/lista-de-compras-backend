import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { Item } from './item/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // endereço do banco
      port: 5432, // porta
      username: 'postgres', // usuário
      password: 'docker', // senha
      database: 'lista', // nome do banco (precisa criar antes no Postgres)
      entities: [Item],
      synchronize: true, // cuidado em produção
    }),
    ItemModule,
  ],
})
export class AppModule {}
