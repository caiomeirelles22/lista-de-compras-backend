import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  addedBy: string;

  @Column({ nullable: true })
  observations?: string;
}
