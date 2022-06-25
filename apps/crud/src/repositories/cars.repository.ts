import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cars } from "../entities/cars.entity";

@Injectable()
export class CarsRepository {

  logger: Logger;

  constructor(
    @InjectRepository(Cars)
    private readonly cars_repository: Repository<Cars>
  ){
    this.logger = new Logger(CarsRepository.name)
  }

  async create(data: any): Promise<any>{
    this.logger.log('Save method db is called')
    return await this.cars_repository.save(data);
  }

  async findOne(id: string): Promise<Cars> {
    this.logger.log('Find one method db is called')
    return await this.cars_repository.findOneBy({ id });
  }

  async findAll(): Promise<Cars[]> {
    this.logger.log('find all method db is called')
    return await this.cars_repository.find();
  }

  async updateById(id: string, data: any): Promise<any> {
    this.logger.log('Updated method db is called')
    return await this.cars_repository.update(id, data);
  }

  async deleteById(id: string): Promise<any> {
    this.logger.log('Delete method db is called')
    return await this.cars_repository.delete(id);
  }

}