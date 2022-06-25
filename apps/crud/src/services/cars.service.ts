import { Injectable } from '@nestjs/common';
import { CarsRequest, CarsResponse } from '../controllers/cars/cars.dto';
import { CarsRepository } from '../repositories/cars.repository';
import { build_cars_db, build_cars_response, build_list_cars_response } from '../shared/helpers/cars.helper';

@Injectable()
export class CarsService {

  constructor(private readonly cars_repository: CarsRepository) {}

  async create(data: CarsRequest): Promise<CarsResponse> {
    const car_to_db = build_cars_db(data)   

    const cars = await this.cars_repository.create(car_to_db);

    return build_cars_response(cars);
  }

  async get(id: string): Promise<CarsResponse | null> {
    const cars = await this.cars_repository.findOne(id);
    
    if(cars) return build_cars_response(cars);
  }

  async getAll(): Promise<CarsResponse[] | null> {

    const cars = await this.cars_repository.findAll()

    if(cars) return build_list_cars_response(cars)
  }

  async delete(id: string): Promise<any> {
    const carDeleted = await this.cars_repository.deleteById(id)
    return carDeleted.affected
  }

  async update(id: string, data: CarsRequest): Promise<any> {
    const car_to_db = build_cars_db(data)   

    const carUpdated = await this.cars_repository.updateById(id, car_to_db)
    console.log(carUpdated)
    return carUpdated
  }
}
