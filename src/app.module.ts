import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module'; // Importando o módulo de Item
import { Item } from './item/item.entity'; // Entidade de Item
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo do banco de dados
      database: 'db.sqlite', // Caminho do arquivo de banco de dados SQLite
      entities: [Item], // Entidades que você vai usar no banco
      synchronize: true, // Criação
    }),
    ItemModule, // Adicionando o módulo de itens
  ],
})
export class AppModule {}
