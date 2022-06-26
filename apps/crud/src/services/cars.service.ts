import { Injectable, Logger } from '@nestjs/common';
import { CarsRequest, CarsResponse } from '@/crud/src/controllers'
import { CarsRepository } from '@/crud/src/repositories';
import { build_cars_db, build_cars_response, build_list_cars_response } from '@/crud/src/shared/helpers';

@Injectable()
export class CarsService {

  logger: Logger;

  constructor(private readonly cars_repository: CarsRepository) {
    this.logger = new Logger(CarsService.name);
  }

  async create(data: CarsRequest): Promise<CarsResponse> {
    this.logger.log('CarService.create initalized')

    this.logger.log('Transform data to structure to db.')
    const car_to_db = build_cars_db(data)   

    this.logger.log('Data transformed structure is ready to create on db.')

    const cars = await this.cars_repository.create(car_to_db);

    this.logger.log('Data are inserted on db with success.')

    this.logger.log('Transform the response structure')
    return build_cars_response(cars);
  }

  async get(id: string): Promise<CarsResponse | null> {
    this.logger.log('CarService.get initalized')
    const cars = await this.cars_repository.findOne(id);
    
    if(cars) {
      this.logger.log('Car found on db')
      this.logger.log('Transform the response structure')
      return build_cars_response(cars);
    }

    this.logger.warn(`Does not exist car on db with id: ${id}`)
  }

  async getAll(): Promise<CarsResponse[] | null> {
    this.logger.log('CarService.getAll initalized')
    const cars = await this.cars_repository.findAll()

    if(cars) {
      this.logger.log('Cars found on db')

      this.logger.log('Transform the response structure an Array list')
      return build_list_cars_response(cars)
    }

    this.logger.warn('Does not exist cars in table')
  }

  async delete(id: string): Promise<any> {
    this.logger.log('CarService.delete initalized')
    const carDeleted = await this.cars_repository.deleteById(id)
    return carDeleted.affected
  }

  async update(id: string, data: CarsRequest): Promise<any> {
    this.logger.log('CarService.update initalized')
    
    this.logger.log('Transform data to structure to db.')
    const car_to_db = build_cars_db(data)   
    const carUpdated = await this.cars_repository.updateById(id, car_to_db)
    return carUpdated.affected
  }
}
