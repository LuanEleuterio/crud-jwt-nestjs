import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cars } from "../entities/cars.entity";

@Injectable()
export class CarsRepository {

  constructor(
    @InjectRepository(Cars)
    private readonly cars_repository: Repository<Cars>
  ){}

  async create(data: any): Promise<any>{
    return await this.cars_repository.save(data);
  }

  async findOne(id: string): Promise<Cars> {
    return await this.cars_repository.findOneBy({ id });
  }

  async findAll(): Promise<Cars[]> {
    return await this.cars_repository.find();
  }

  async updateById(id: string, data: any): Promise<any> {
    return await this.cars_repository.update(id, data);
  }

  async deleteById(id: string): Promise<any> {
    return await this.cars_repository.delete(id);
  }

}