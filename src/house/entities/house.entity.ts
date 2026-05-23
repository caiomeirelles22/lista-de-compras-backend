import { Item } from 'src/item/item.entity';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class House {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', description: 'ID único da casa (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Casa de Praia', description: 'Nome atribuído à casa ou grupo' })
  @Column()
  name: string;

  @ApiProperty({ example: '54321', description: 'Código de convite exclusivo com 5 dígitos' })
  @Column({ unique: true })
  code: string;

  @ManyToMany(() => User, (user) => user.houses)
  members: User[];

  @OneToMany(() => Item, (item) => item.house)
  items: Item[];
}