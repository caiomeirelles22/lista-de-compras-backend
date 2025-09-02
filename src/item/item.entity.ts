import { House } from 'src/house/entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column()
  measure: string;

  @Column({ nullable: true })
  observations?: string;

  @ManyToOne(() => User, (user) => user.itemsAdded)
  addedBy: User;

  @ManyToOne(() => House, (house) => house.items)
  house: House;
}
