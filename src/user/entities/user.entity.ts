import { House } from 'src/house/entities/house.entity';
import { Item } from 'src/item/item.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 'uuid-aqui' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Caio Meirelles' })
  // 👇 ADICIONE O DEFAULT AQUI
  @Column({ default: 'Usuário Antigo' }) 
  name: string;

  @ApiProperty({ example: '22999999999' })
  @Column({ unique: true })
  phone: string;

  // 👇 ADICIONE O DEFAULT AQUI TAMBÉM
  @Column({ default: '123456' })
  password: string; 

  @ApiPropertyOptional({ example: 'caio_m' })
  @Column({ nullable: true })
  username?: string;

  @ApiPropertyOptional({ example: 'caio@email.com' })
  @Column({ nullable: true })
  email?: string;

  @ManyToMany(() => House, (house) => house.members)
  @JoinTable()
  houses: House[];

  @OneToMany(() => Item, (item) => item.addedBy)
  itemsAdded: Item[];
}