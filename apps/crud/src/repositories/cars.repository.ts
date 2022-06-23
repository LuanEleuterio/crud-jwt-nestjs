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

  create(data: any): Promise<any>{
    return this.cars_repository.save(data);
  }

  findOne(id: string): Promise<Cars> {
    return this.cars_repository.findOneBy({ id });
  }

  findAll(): Promise<Cars[]> {
    return this.cars_repository.find();
  }

  async deleteById(id: string): Promise<void> {
    await this.cars_repository.delete(id);
  }

}