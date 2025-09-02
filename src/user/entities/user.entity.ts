import { House } from 'src/house/entities/house.entity';
import { Item } from 'src/item/item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;


  @Column()
  username: string;

  @ManyToMany(() => House, (house) => house.members)
  @JoinTable()
  houses: House[];

  @OneToMany(() => Item, (item) => item.addedBy)
  itemsAdded: Item[];
}
