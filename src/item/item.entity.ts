import { House } from 'src/house/entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Item {
  @ApiProperty({ example: 'uuid-aqui' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Arroz Agulha' })
  @Column()
  name: string;

  @ApiProperty({ example: 2 })
  @Column('int')
  quantity: number;

  @ApiProperty({ example: 'kg' })
  @Column()
  measure: string;

  @ApiPropertyOptional({ example: 'Trazer da embalagem azul' })
  @Column({ nullable: true })
  observations?: string;

  // 👇 NOVAS COLUNAS DE AUDITORIA E STATUS 👇
  
  @CreateDateColumn() // Preenchido automaticamente no momento do POST
  createdAt: Date;

  @Column({ default: false }) // Todo item nasce como "não comprado"
  isBought: boolean;

  @Column({ type: 'timestamp', nullable: true })
  boughtAt?: Date;

  @ManyToOne(() => User, (user) => user.itemsAdded)
  addedBy: User; // Quem adicionou

  @ManyToOne(() => User, { nullable: true })
  boughtBy?: User; // Quem comprou

  @ManyToOne(() => House, (house) => house.items)
  house: House;
}