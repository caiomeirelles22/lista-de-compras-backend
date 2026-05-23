import { House } from 'src/house/entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Item {
  @ApiProperty({ example: 'e5f67890-1234-5678-9abcdef0-1a2b3c4d5e6f', description: 'ID único do item (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Arroz Agulha', description: 'Nome do produto' })
  @Column()
  name: string;

  @ApiProperty({ example: 2, description: 'Quantidade necessária' })
  @Column('int')
  quantity: number;

  @ApiProperty({ example: 'kg', description: 'Unidade de medida do produto' })
  @Column()
  measure: string;

  @ApiPropertyOptional({ example: 'Trazer da embalagem azul', description: 'Observações adicionais do item' })
  @Column({ nullable: true })
  observations?: string;

  @ManyToOne(() => User, (user) => user.itemsAdded)
  addedBy: User;

  @ManyToOne(() => House, (house) => house.items)
  house: House;
}