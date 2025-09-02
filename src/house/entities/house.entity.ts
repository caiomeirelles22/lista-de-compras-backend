import { Item } from 'src/item/item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @ManyToMany(() => User, (user) => user.houses)
  members: User[];

  @OneToMany(() => Item, (item) => item.house)
  items: Item[];
}