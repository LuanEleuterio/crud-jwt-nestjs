import { Injectable } from '@nestjs/common';
import { CarsRepository } from '../repositories/cars.repository';

@Injectable()
export class CarsService {

  constructor(private readonly cars_repository: CarsRepository) {}

  async create(car: any): Promise<any> {
    return await this.cars_repository.create(car);
  }
}
