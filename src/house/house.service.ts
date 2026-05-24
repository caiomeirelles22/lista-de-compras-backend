import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { House } from "./entities/house.entity";
import { User } from "src/user/entities/user.entity";
import { CreateHouseDto } from "./dto/create-house.dto";
import { JoinHouseDto } from "./dto/join-house.dto";
import { UpdateHouseDto } from "./dto/update-house.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  private generateHouseCode(): string {
  
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    const { name, userId } = createHouseDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${userId} não encontrado`);
    }

    let code: string;
    let isCodeUnique = false;
  
    while (!isCodeUnique) {
      code = this.generateHouseCode();
      const existingHouse = await this.houseRepository.findOneBy({ code });
      if (!existingHouse) {
        isCodeUnique = true;
      }
    }

    const newHouse = this.houseRepository.create({
      name,
      code, 
      members: [user],
    });

    return this.houseRepository.save(newHouse);
  }

  async addMemberByPhone(houseId: string, addMemberDto: AddMemberDto): Promise<House> {
    const { phone } = addMemberDto;

 
    const userToAdd = await this.userRepository.findOneBy({ phone });
    if (!userToAdd) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o celular ${phone}.`);
    }

  
    const house = await this.houseRepository.findOne({ where: { id: houseId }, relations: ['members'] });
    if (!house) {
      throw new NotFoundException('Casa não encontrada');
    }

  
    if (house.members.some(member => member.id === userToAdd.id)) {
      throw new BadRequestException(`${userToAdd.username} já é membro desta casa.`);
    }

    house.members.push(userToAdd);
    return this.houseRepository.save(house);
  }
  async findAll(): Promise<House[]> {
    return this.houseRepository.find({ relations: ['members'] });
  }

 async findOne(id: string): Promise<House> {
    const house = await this.houseRepository.findOne({
      where: { id },
      // 👇 A CORREÇÃO VERDADEIRA ESTÁ NESTA LINHA ABAIXO 👇
      relations: ['members', 'items', 'items.addedBy', 'items.boughtBy'],
    });
    if (!house) throw new NotFoundException('Casa não encontrada');
    return house;
  }
  async update(id: string, updateHouseDto: UpdateHouseDto): Promise<House> {
 
    const house = await this.houseRepository.preload({ id, ...updateHouseDto });
    if (!house) throw new NotFoundException('Casa não encontrada');
    return this.houseRepository.save(house);
  }

  async join(joinHouseDto: JoinHouseDto): Promise<House> {
    const { userId, code } = joinHouseDto; 

    const house = await this.houseRepository.findOne({ where: { code }, relations: ['members'] });
    if (!house) {
      throw new NotFoundException('Casa não encontrada com este código.');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (house.members.some(member => member.id === userId)) {
      throw new BadRequestException('Usuário já é membro desta casa');
    }

    house.members.push(user);
    return this.houseRepository.save(house);
  }

  async remove(id: string): Promise<void> {
    const house = await this.findOne(id);
    if (house.items && house.items.length > 0) {
      throw new BadRequestException(
        'Não é possível deletar uma casa que ainda possui itens na lista. Por favor, remova os itens primeiro.'
      );
    }
    await this.houseRepository.remove(house);
  }

  async removeMember(houseId: string, userId: string): Promise<House> {
    const house = await this.houseRepository.findOne({ where: { id: houseId }, relations: ['members'] });
    if (!house) throw new NotFoundException('Casa não encontrada');

    house.members = house.members.filter(member => member.id !== userId);
    return this.houseRepository.save(house);
  }
}